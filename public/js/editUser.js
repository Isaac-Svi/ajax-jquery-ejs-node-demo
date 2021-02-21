const modal = $('#edit')
const form = modal.find('form')

// made these global variables
// otherwise, the form was submitting twice and changing all users
// making them global prevents their rewrite in any other place but the modal.on
let id = ''
let td = ''

modal.on('show.bs.modal', function (event) {
  // set id and td above, so we know the id of the user we're editing
  // + which DOM elements' text we're changing
  const button = $(event.relatedTarget)
  id = button.data('uid')
  td = button.closest('td').siblings()

  // populate the username field in the modal form with the current name of user to be edited
  const username = $(td[0]).text()
  modal.find('#username').val(username)
})

form.submit(function (event) {
  event.preventDefault()

  // serialize form data into form: username='some username'&password='some password'
  const formData = $(form).serialize()

  // change serailzed data into JSON object
  const params = { id }
  formData.split('&').forEach((x) => {
    const arr = x.split('=')
    params[arr[0]] = arr[1]
  })

  // make POST request to edit user
  fetch('/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then((data) => {
      $(td[0]).text(data.username)
      $(td[1]).text(data.password)
      form[0].reset()
      modal.modal('hide')
    })
    .catch((err) => console.log(err.message))
})
