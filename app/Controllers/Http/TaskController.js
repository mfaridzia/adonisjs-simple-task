'use strict'

const Task = use('App/Models/Task')
const { validate } = use('Validator')

class TaskController {
    
    async index ({ view }) {
        const tasks = await Task.all()

        return view.render('tasks.index', { tasks: tasks.toJSON() })
    }

    async store ({ request, response, session }) {
        
        // validation form input
        const validation = await validate(request.all(), {
            title: 'required|min:5|max:255'
        })

        // show error messages when validation fail
        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const task = new Task()
        task.title = request.input('title')
        await task.save()

        // send success message
        session.flash({ notification: 'Task added!' })

        return response.redirect('back')
    }

    async destroy ({ params, session, response }) {
        const task = await Task.find(params.id)
        await task.delete()

        // send success message
        session.flash({ notification: 'Task deleted!' })

        return response.redirect('back')
    }

}

module.exports = TaskController
