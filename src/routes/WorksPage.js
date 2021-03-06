import React from 'react'
import List from '../components/Works/List'
import Search from '../components/Works/Search'
import Pop from '../components/Works/Pop'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

const WorksPage = ({ location, dispatch, works}) => {

  const { list, loading, total, current, currentItem, modalType, modalVisible,selectAllAuthors } = works
  const searchProps = {
    onSearch(fieldsValue) {
      dispatch({
        type: 'works/query',
        payload: fieldsValue
      })
    },
    onAdd() {
      dispatch({
        type: 'works/showModal',
        payload: {
          modalType: 'create'
        }
      })
    }
  }

  const popProps = {
    selectAllAuthors,
    item: modalType === 'create' ? {} : currentItem,
    type: modalType === 'create' ? '新增作品' : '修改作品',
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `works/${modalType}`,
        payload: data
      })
    },
    onCancel(item) {
      // console.log('cancel')
      // console.log(item)
      dispatch({
        type: 'works/hideModal'
      })
    }
  }

  const listProps = {
    dataSource: list,
    loading,
    total,
    current,
    onPageChange(page) {
      dispatch(routerRedux.push({
        pathname: '/works',
        query: { page}
      }))
    },
    onDeleteItem(id) {
      console.log(id)
      dispatch({
        type: 'works/delete',
        payload: id
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'works/showModal',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
    }
  }





  return (
    <div>
      <Search {...searchProps} />
      <Pop {...popProps} />
      <List {...listProps} />
    </div>
  )
}

WorksPage.propTypes = {
}

function mapStateToProps ({ works }) {
  return {works}
}

export default connect(mapStateToProps)(WorksPage)