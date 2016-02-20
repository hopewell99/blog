import React, {Component} from 'react'

import classNames from 'classNames'

import { jumpToAnchor } from '../../util/common'

class ContentTable extends Component {
    constructor() {
        super()
    }

    render() {
        let { contentTable } = this.props
        if (contentTable.appear === false) {
        }

        let contentTableDOM = this.getContentTableDOM(contentTable.content)

        let buttonClass = classNames({
            'content-table-button': true,
            'content-table-button-clicked': contentTable.isShow,
            'content-table-button-disapper': !contentTable.appear
        })
        let sidebarClass = classNames({
            'content-table-sidebar': true,
            'content-table-sidebar-show': contentTable.isShow
        })

        return (
            <div className="content-table">
                <div className={buttonClass} onClick={this.toggleContentTable.bind(this)}>
                    button
                </div>
                <div className={sidebarClass}>
                    {contentTableDOM}
                </div>
            </div>
        )
    }

    toggleContentTable() {
        let {
            contentDOMId, contentTable,
            showContentTable, hiddenContentTable, loadContentTableContent
        } = this.props

        // 第一次需从 dom 里加载出 contentTable
        if (contentTable.content === undefined) {
            let contentTableContent = getContentTableContent(document.getElementById(contentDOMId))
            loadContentTableContent(contentTableContent)
        }

        const wrapperMoveClass = ' wrapper-move'
        if (contentTable.isShow === false) {
            wrapperMove(wrapperMoveClass, this.props.wrapperId)
            showContentTable()
        } else {
            wrapperReset(wrapperMoveClass, this.props.wrapperId)
            hiddenContentTable()
        }
    }

    getContentTableDOM(contentTable) {
        if (contentTable === undefined) {
            return
        }

        return contentTable.map(item => {
            return (
                <a className="content-table-item" key={item.content}
                    data-rank={item.rank} href={'#' + item.content}
                    onClick={jumpToAnchor}>
                    {item.content}
                </a>
            )
        })
    }
}

function wrapperMove(wrapperMoveClass, wrapperId) {
    let wrapperDOM = document.getElementById(wrapperId)
    wrapperDOM.className += wrapperMoveClass
}

function wrapperReset(wrapperMoveClass, wrapperId) {
    let wrapperDOM = document.getElementById(wrapperId)
    wrapperDOM.className = wrapperDOM.className.replace(wrapperMoveClass, '' );
}

function getContentTableContent(contentDOM) {
    let contentDOMArray = Array.prototype.slice.call(contentDOM.children)
    let contentTable = contentDOMArray.filter(item => {
        let tagNameArray = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
        return tagNameArray.indexOf(item.tagName) !== -1
    })
    // id tagName
    contentTable = contentTable.map(item => {
        let newItem = {
            content: item.id,
            // tagName is 'Hx', rank is x
            rank: Number.parseInt(item.tagName[1], 10),
        }
        return newItem
    })

    return contentTable
}

export default ContentTable
