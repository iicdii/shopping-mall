import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import HomeLayout from '../../layout/HomeLayout';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <HomeLayout>
        <div className="home">
          <section className="main">
            <div className="main-img" />
          </section>
          <section className="second">
            <div className="start-now">
              <Link to="/products">
                <Button type="primary" ghost size="large">
                  지금 시작하기
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </HomeLayout>
    );
  }
}
