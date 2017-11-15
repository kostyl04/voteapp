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
        } ).done( function( data ) {
            self.setState( { polls: data } );
        } );
    }
    render() {
        return ( <div>
            <div className="col-xs-6 text-center">
                <h2>Polls:</h2>
                <PollList polls={this.state.polls} />
            </div>
            <div className="col-xs-6 text-center">
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
            <Poll key={poll.id} poll={poll} /> );
        return <div>{polls}</div>;
    }
}
class Poll extends React.Component {
    constructor( props ) {
        super( props );


    }
    render() {
        console.dir( this.props.poll );

        let link = "/polls/" + this.props.poll.link;
        return <div className="row">
            <div className="col-xs-6 text-center">{this.props.poll.subject.title}</div>
            <div className="col-xs-6 text-center"><a href={link}>go to poll</a></div>
        </div>;

    }

}
class StartPollForm extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { subjectList: [], newPoll: { answers: [], subject: {} } };
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
        this.setState( this.state );
    }
    startPoll() {
        let self = this;
        $.ajax( {
            url: "http://localhost:8080/api/polls/start",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(self.state.newPoll)
        } ).done( function( data ) {
            self.props.onStart();
        } );
        this.state.newPoll.answers = [];
        this.setState( this.state );
        

    }
    loadSubjects() {
        let self = this;
        $.ajax( {
            url: "http://localhost:8080/api/subjects/",
            method: "GET",
            contentType: "application/json"
        } ).done( function( data ) {
            self.state.subjectList=data;
            self.state.newPoll.subject.id=data[0].id;
            self.setState(self.state );
        } );
    }
    render() {
        console.dir( this.state.subjectList );
        let subjectSelectOpt = this.state.subjectList.map( subject => {
            return <option key={subject.id} value={subject.id}>{subject.title}</option>
        } );
        let subjectSelect = <select className="form-control" onChange={this.onSubjectChange} value={this.state.newPoll.subject.id}>{subjectSelectOpt}</select>;
        let answerInput = <div><input type="text" id="answerInput" className="form-control" /><button onClick={this.onAnswerAdd} className="btn btn-primary">add</button></div>;
        let answers = this.state.newPoll.answers.map(( answer, i ) => {
            return <label key={i} className="label label-primary">{answer.name}</label>;
        } );
        return <div>
            <div className="row text-center"> Start poll!</div>
            <div className="row form-group"><label>Select a poll's subject</label>{subjectSelect}</div>
            <div className="row form-group"><label>Add a poll's answer</label>{answerInput}</div>
            <div className="row">{answers}</div>
            <div className="row text-center"><button onClick={this.startPoll} className="btn btn-success">Start poll</button></div></div>;
    }
}
/*class PollAnswer extends React.Component {
    constructor( props ) {
        super( props );
    }
    render() {
        let voteBtn = this.props.answer.isActive ? <div className="col-xs-3"><button className="btn btn-primary"  >Vote!</button></div> : null;
        return <div className="row">
            <div className="col-xs-5">{this.props.answer.name}</div>
            <div className="col-xs-4">{this.props.answer.votes}</div>
            {voteBtn}
        </div>
    }
}*/



export default PollPage;