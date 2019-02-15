import React, { Component } from 'react';
import PageLayout from '../../layout/PageLayout';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <PageLayout>
        <div className="home">It's Home!</div>
      </PageLayout>
    );
  }
}
