import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from "react-redux";
import './index.scss'

@connect(({ indexModel }) => {
  return {
    data: {
      indexModel
    }
  }
})
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { data } = this.props;
    console.log(this.props)
    return (
      <View className='index-container'>
        <View>Taro:v3.0.17</View>
        <View>Taro-ui+dav</View>
      </View>
    )
  }
}
