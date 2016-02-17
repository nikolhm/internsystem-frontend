import React from 'react'
import {Route} from 'react-router'
import reactor from '../../../reactor'

import ListStore from './ListStore'
import List from './List'

reactor.registerStores({
  varerSalesEstimates: ListStore,
})

export default (
  <Route>
    <Route name="varer/salesestimates" path="/varer/salesestimates" handler={List}/>
  </Route>
)
