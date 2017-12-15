'use strict';

import $ from "jquery";
const React = require( 'react' );
const ReactDOM = require( 'react-dom' );


class PollPage extends React.Component {

    constructor( props ) {
        super( props );
        console.dir( this.props );
        this.state = { polls: [] };
        this.loadPolls = this.loadPolls.bind( this );
    }

    componentDidMount() {
        this.loadPolls();

    }
    loadPolls() {
        let self = this;
        $.ajax( {
            url: "http://localhost:8080/api/polls/",
            method: "GET",
            contentType: "application/json"
        } ).then( function( data ) {
            self.setState( { polls: data } );
        } );
    }
    render() {
        return ( <div>
            <div className="col-sm-6 text-center">
                <h2>Polls:</h2>
                <div className="col-sm-6 text-center lead   ">title</div>
                <div className="col-sm-2 text-center lead   ">status</div>
                <div className="col-sm-4 text-center lead   ">link</div>
                <PollList onClose={this.loadPolls} polls={this.state.polls} />
            </div>
            <div className="col-sm-6 text-center">
                <StartPollForm onStart={this.loadPolls} />
            </div></div>
        )
    }
}
class PollList extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        let polls = this.props.polls.map( poll =>
            <Poll onClose={this.props.onClose} key={poll.id} poll={poll} /> );
        return <div>{polls}</div>;
    }
}
class Poll extends React.Component {
    constructor( props ) {
        super( props );
        this.closePoll = this.closePoll.bind( this );


    }
    closePoll( id ) {
        let self = this;
        $.ajax( {
            url: "http://localhost:8080/api/polls/" + id,
            method: "PUT",
            contentType: "application/json",
        } ).then( function( data ) {
            self.props.onClose();
        } );
    }
    render() {
        console.dir( this.props.poll );

        let link = "/polls/" + this.props.poll.link;
        let status;
        if ( this.props.poll.closed ) {
            status = <div className="col-sm-4 text-center">closed</div>;
        } else{
            status = <div className="col-sm-4 text-center">active <span  onClick={() => this.closePoll( this.props.poll.id )} className="badge" style={{cursor:'pointer'}}>close</span ></div>;
        }
           

        return <div className="row">
            <div className="col-sm-4 text-center">{this.props.poll.subject.title}</div>
            {status}
            <div className="col-sm-4 text-center"><a href={link}>go to poll</a></div>
        </div>;

    }

}
class StartPollForm extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { subjectList: [], newPoll: { answers: [], subject: {} }, error: null, message: null };
        this.loadSubjects = this.loadSubjects.bind( this );
        this.onSubjectChange = this.onSubjectChange.bind( this );
        this.onAnswerAdd = this.onAnswerAdd.bind( this );
        this.startPoll = this.startPoll.bind( this );
    }
    componentDidMount() {
        this.loadSubjects();

    }
    onSubjectChange( e ) {
        this.state.newPoll.subject.id = e.target.value;
        this.setState( this.state );
    }
    onAnswerAdd( e ) {
        this.state.newPoll.answers.push( { name: $( "#answerInput" ).val() } );
        $( "#answerInput" ).val( '' );
        this.state.message = null;
        if ( this.state.newPoll.answers.length >= 2 )
            this.state.error = null;
        this.setState( this.state );
    }
    startPoll() {
        let self = this;
        if ( self.state.newPoll.answers.length < 2 ) {

            this.state.error = "Add atleast 2 answers!";
            this.setState( this.state );
        } else {
            $.ajax( {
                url: "http://localhost:8080/api/polls/start",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify( self.state.newPoll ),
                statusCode: {
                    201: function( data ) {
                        console.log( "okay" );
                        self.props.onStart();
                        self.state.message = 'Poll has been started!'
                        self.setState( self.state );
                    }
                }
            } );
            this.state.newPoll.answers = [];
            this.setState( this.state );
        }

    }
    loadSubjects() {
        let self = this;
        $.ajax( {
            url: "http://localhost:8080/api/subjects/",
            method: "GET",
            contentType: "application/json"
        } ).then( function( data ) {
            self.state.subjectList = data;
            self.state.newPoll.subject.id = data[0].id;

            self.setState( self.state );
        } );
    }
    render() {
        console.dir( this.state.subjectList );
        let subjectSelectOpt = this.state.subjectList.map( subject => {
            return <option key={subject.id} value={subject.id}>{subject.title}</option>
        } );
        let subjectSelect = <select className="form-control" onChange={this.onSubjectChange} value={this.state.newPoll.subject.id}>{subjectSelectOpt}</select>;
        let answerInput = <div><input type="text" id="answerInput" className="form-control" /><div className="row text-center"><button onClick={this.onAnswerAdd} className="btn btn-primary">add</button></div></div>;
        let answers = this.state.newPoll.answers.map(( answer, i ) => {
            return <label key={i} className="label label-primary">{answer.name}</label>;
        } );
        let errors = this.state.error == null ? false : true;
        console.log( errors );
        return <div>
            <div className="row text-center"> Start poll!</div>
            <div className="row form-group"><label>Select a poll's subject</label>{subjectSelect}</div>
            <div className="row form-group"><label>Add a poll's answer</label>{answerInput}</div>
            {errors ? <div className="row alert alert-danger text-center">{this.state.error}</div> : ''}
            <div className="row">{answers}</div>
            <div className="row text-center"><button onClick={this.startPoll} className="btn btn-success">Start poll</button></div>
            {this.state.message != null ? <div className="row text-center alert alert-success">{this.state.message}</div> : ''}
        </div>;
    }
}




export default PollPage;