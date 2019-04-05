function fetchMyRepos() {
    $('#user-profile').html('')
    $('#listing').html('')
    $('#form-repo').html('')

    $.ajax({
        url : 'http://localhost:4000/github/repo/paulinavita',
        type : 'GET'
    })
    .done(function(response) {

        let data = `<table>
        <tr>
        <th>No.</th>
        <th>Repository Name</th>
        </tr>
        <tr> `

        response.forEach( (el, idx) => {
            data += `<td>${idx+1}</td>`
            data += `<td><a href="${el.html_url}" >${el.full_name}</a></tr>`
        })
        data += ` </table>`

        $('#listing').append(data)
    })
}

function fetchStarred() {
    $('#user-profile').html('')
    $('#listing').html('')
    $('#form-repo').html('')
    $.ajax({
        url : 'http://localhost:4000/github/starred',
        type : 'GET'
    })
    .done(function(response) {

        let data = `<table>
        <tr>
        <th>No.</th>
        <th>Repository Name</th>
        </tr>
        <tr> `
        
        response.forEach( (el, idx) => {
            data += `<td>${idx+1}</td>`
            data += `<td><a href="${el.repos_url}" >${el.full_name}</a></tr>`
        })
        data += ` </table>`
        console.log("hasil star repo ====", data)

        $('#listing').append(data)
    })
}


// function fetchLanding() {
//     $('#title-landing').hide()
//     $('#alert-div').html('')
//     $('#create-form').hide()
//     $('#logged-in-navbar').hide()
// }

function fetchHomepage() {
    $('#alert-div').html('')

    $(document).ready(function () {
        $.ajax({
            url: 'http://localhost:4000/github/myprofile',
            type : 'GET'
        })
        .done(function(result) {
            console.log(result, 'dpt apa ya')
            $('#username').html(result.login)
            $('#user-bio').html(result.bio)
            $('#user-profile').append(`
            <center>
            <div class="col-md-4">
            <div class="card">
            <img class="card-img-top" src="`+ result.avatar_url +`" alt="image">
            <div class="card-body">
                <h5 class="card-title">`+ result.name +`</h5>
                <h6 class="card-subtitle mb-2 text-muted">`+ result.bio +`</h6>
                </div>
            </div>
            </div>
            <center>
            `)
        })
    })
}

function createRepo() {
    console.log('masuklkkasdkjasdkaskjdasdjkhjh')
    event.preventDefault();
    console.log('mau bikin repo baru')
    let name = $('#new-repo-name').val()
    let description = $('#new-repo-desc').val()
    $.ajax({
        url : 'http://localhost:4000/github/createrepo',
        method : 'POST',
        data : {
            name, description
        }
    })
    .done(function(response) {
        $('#alert-div').append(`<div style="width:30%" class="alert alert-dark" role="alert">
        Succesfully created new repository ${response.name}.
        </div>`)

        console.log(response.name)
        
    })
    .fail(function(jqXHR, textSatus) {
        console.log('request failed', textSatus)
    })
}   

function search() {
    $('#user-profile').html('')
    $('#listing').html('')
    $('#form-repo').html('')
    $(`#container-full`).html('')
    $(`#container-full`).append(`
    <div class = "container2">

    <h4> Check Your Friend's Repository </h4>
        <form method="post" onsubmit="searchFriendRepo()" id="check-other-repo">
        <input type="text" id="other-repo-username" class="form-control" style="width:30%" placeholder="Username" name="userame"> <br>
        <input type="submit">
        </form>
    <br><br>
    <h4> Unstar A Repository </h4>
    <form method="post" onsubmit="unstarFriendRepo()" id="unstar-form">
    <input type="text" id="repo-owner" class="form-control" style="width:30%" placeholder="Owner name" name="owner"> <br>
    <input type="text" id="repo-name" class="form-control" style="width:30%" placeholder="Repository name" name="repository"> <br>
    <input type="submit">
    </form>
    </div>
    `)
}

function unstarFriendRepo() {
    event.preventDefault();
    // router.delete('/unstar/:owner/:repo', githubController.unstarRepo)
    let owner = $('#repo-owner').val()
    let repository = $('#repo-name').val()
    console.log(owner, repository, 'disnii')
    $.ajax({
        url : `http://localhost:4000/github/unstar/${owner}/${repository}`,
        method : 'DELETE',
    })
    .done(function(response) {
        $(`#container-full`).append(`<p> Berhasil unstar! </p>`)
        console.log('berhasil unstar')
    })

    .fail(function(jqXHR, textSatus) {
        console.log('request failed', textSatus)
    })
}

function searchFriendRepo() {
    console.log('masuk disini care repoorang')
    event.preventDefault()
    const username = $('#other-repo-username').val()
    
    $('#user-profile').html('')
    $('#listing').html('')
    $('#form-repo').html('')
    $(`#container-full`).html('')

    
    $.ajax({
        url : `http://localhost:4000/github/repo/${username}`,
        method : 'GET',

    })
    .done(function(response) {
        console.log(response, 'ini hasil cari repo orang')
        let data = `<table>
        <tr>
        <th>No.</th>
        <th>Repository Name</th>
        </tr>
        <tr> `

        response.forEach( (el, idx) => {
            data += `<td>${idx+1}</td>`
            data += `<td><a href="${el.html_url}" >${el.name}</a></tr>`
        })
        data += ` </table>`

        $(`#container-full`).append(data)
    
        // $('#listing').prepend(`<li>${response}</li>`)
    })
    .fail(function(jqXHR, textSatus) {
        console.log('request failed', textSatus)
    })

}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); 
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); 

    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token, 'idddd')

    // $.post(`http://localhost:4000/auth/google-sign-in`, { token : id_token })
    $.ajax({
        url : `http://localhost:4000/auth/google-sign-in`,
        method : 'POST',
        data : { token : id_token }
    })
    .done(function(response) {
        console.log('============================', response)
        console.log(response, 'iiii')
        localStorage.setItem('token', response.token)
    })

    .fail(function(jqXHR, textSatus) {
        console.log('request failaaaaaaed', textSatus)
    })
  }



// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
//   }


  

$(document).ready(function () {
    fetchHomepage()

    // if  (!localStorage.getItem('token')) {
    //     $('#create-form').hide()
    //     $('#google-sign-out').hide()
    //     $('#google-sign-in').show()
    //     fetchHomepage()

    // } else {
    //     $('#google-sign-out').show()
    //     $('#create-form').show()
    //     $('#google-sign-in').hide()
    //     fetchHomepage()

    // }

    // fetchLanding()
    // fetchLogin()

    $('#my-repositories').on('click', function () {
        fetchMyRepos()
    })

    $('#starred-repositories').on('click', function() {
        fetchStarred()
    })

     $('#submit-new-repo').on('click', function() {
     createRepo()
     })

    $('#search').on('click', function()  {
        search()
    })

    $('#check-other-repo').on('click', function()  {
        searchFriendRepo()
    })
})