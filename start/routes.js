'use strict'

const Route = use('Route')

Route.get('/', 'TaskController.index')
Route.post('/tasks', 'TaskController.store')
Route.delete('/tasks/:id', 'TaskController.destroy')