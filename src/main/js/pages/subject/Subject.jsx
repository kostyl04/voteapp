'use strict';

import $ from "jquery";
const React = require( 'react' );
const ReactDOM = require( 'react-dom' );


class SubjectPage extends React.Component {

    constructor( props ) {
        super( props );
        console.dir( this.props );
        this.state = { subjects: [] };
        this.loadSubjects = this.loadSubjects.bind( this );
    }

    componentDidMount() {
        this.loadSubjects();

    }
    loadSubjects() {
        let self = this;
        $.ajax( {
            url: "http://localhost:8080/api/subjects/",
            method: "GET",
            contentType: "application/json"
        } ).then( function( data ) {
            self.setState( { subjects: data } );
        } );
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <SubjectList subjects={this.state.subjects} />
                </div> <div className="col-sm-6">
                    <SubjectAddingForm onCreate={this.loadSubjects} /></div></div>
        )
    }
}



class SubjectList extends React.Component {
    render() {
        let subjects = this.props.subjects.map( subject =>
            <Subject key={subject.id} subject={subject} />
        );

        return (
            <table className="table table-striped table-bordered">
                <thead><tr>
                    <th>id</th>
                    <th>title</th>

                </tr></thead>
                <tbody>
                    {subjects}
                </tbody>
            </table>
        )
    }
}
class SubjectAddingForm extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { subject: { title: '' } };
        this.onTitleChange = this.onTitleChange.bind( this );
        this.onSubmit = this.onSubmit.bind( this );
    }
    onTitleChange( e ) {
        this.state.subject.title = e.target.value;
        this.setState( this.state );
    };
    onSubmit( e ) {
        e.preventDefault();

        let self = this;
        $.ajax( {
            url: "http://localhost:8080/api/subjects/add",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify( self.state.subject )
        } ).then( function( data ) {
            self.props.onCreate();
            self.state.subject.title = '';
        } );

    };
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="row form-group">
                    <div className="col-sm-3">
                        <label className="control-label"> title:</label></div><div className="col-sm-9"><input type="text" value={this.state.subject.title} className="form-control" name="name" onChange={this.onTitleChange} />
                    </div></div>
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-8">
                        <input type="submit" className="btn btn-success " value="create" /></div></div>
            </form>


        )
    }
}
class Subject extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.subject.id}</td>
                <td>{this.props.subject.title}</td>

            </tr>
        )
    }
}

export default SubjectPage;