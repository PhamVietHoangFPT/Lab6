import React, { Component } from 'react'
import { Orchids } from '../content/listOfOrchids'
import ContentPre from '../content/ContentPre'

export default class mainCom extends Component {
    constructor() {
        super()
        this.state = {
            Orchids: Orchids
        }
    }

    render() {
        return (
            <>
                <ContentPre Orchids={this.state.Orchids} />
            </>
        )
    }
}