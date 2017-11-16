'use strict';

import $ from "jquery";
const React = require( 'react' );
const ReactDOM = require( 'react-dom' );


class PollInfo extends React.Component {

    constructor( props ) {
        super( props );
        console.dir( this.props );
        this.state = { selectedAnswer: undefined };
        this.loadPoll = this.loadPoll.bind( this );
        this.selectAnswer = this.selectAnswer.bind( this );
        this.vote = this.vote.bind( this );
    }
    componentDidMount() {
        this.loadPoll();

    }
    selectAnswer( answer ) {
        this.state.selectedAnswer = answer;
        this.setState( this.state );
    }
    vote() {
        let self = this;
        let link = "http://localhost:8080/api/polls/" + self.state.selectedAnswer.pollId + "/answers/" + self.state.selectedAnswer.name + "/vote";
        $.ajax( {
            url: link,
            method: "PUT",
            contentType: "application/json"
        } ).then( function( data ) {

            self.state.selectedAnswer = undefined;
            self.loadPoll();
        } );
    }
    loadPoll() {
        let self = this;
        let link = "http://localhost:8080/api/polls/" + self.props.match.params.pollLink;
        $.ajax( {
            url: link,
            method: "GET",
            contentType: "application/json"
        } ).then( function( data ) {
            self.state.poll = data;
            self.setState( self.state );
        } );
    }
    render() {
        if ( this.state.poll ) {
            let answerTable;
            let answerSelect;

            let self = this;
            let answersNames = [];
            let answersVotes = [];
            for ( let answer of this.state.poll.answers ) {
                let clName = '';
                if ( this.state.selectedAnswer && answer == this.state.selectedAnswer )
                    clName = "bg-primary";
                answersNames.push( <td className={clName} onClick={!this.state.poll.closed ? () => this.selectAnswer( answer ) : null} key={answer.id}>{answer.name}</td> );
                answersVotes.push( <td className={clName} onClick={!this.state.poll.closed ? () => this.selectAnswer( answer ) : null} key={answer.id}>{answer.votes}</td> );
            }

            let voteBtn = this.state.selectedAnswer ? <button className="btn btn-success" onClick={() => this.vote()}>Vote!</button> : null;
            let closed = null;
            if ( this.state.poll.closed )
                closed = '(closed)';

            return <div className="text-center">
                <div className="lead">{this.state.poll.subject.title}{closed}</div>
                <table className="table table-striped table-bordered table-hovered">
                    <tbody>
                        <tr>{answersNames}</tr>
                        <tr>{answersVotes}</tr>
                    </tbody>
                </table>
                {voteBtn}
            </div>;
        } else return <div></div>;



    };
}

export default PollInfo;