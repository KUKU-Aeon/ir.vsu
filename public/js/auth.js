
document.addEventListener('DOMContentLoaded', () => {

    const sub_button = document.getElementById('signup');
    const login_button = document.getElementById('signin');

    if (login_button)
    {
        login_button.addEventListener('click', () => {
            let email = document.getElementById('in-mail').value;
            let password = document.getElementById('in-pass').value;
            UserSignIn(email, password);
        });
    }

    if (sub_button)
    {
        sub_button.addEventListener('click', () => {
            let email = document.getElementById('up-mail').value;
            let password = document.getElementById('up-pass').value;
            createUser(email, password);

        });
    }

    const createUser =  (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then( () => {
                const user = auth.currentUser

                const database_ref = database.ref();

                const user_data = {
                    email: email,
                    password: password,
                    last_login: Date.now(),
                    role: "user",
                }

                console.log(user_data);

                database_ref.child('users/' + user.uid).set(user_data);

                window.localStorage.setItem("user", JSON.stringify(user_data.role));

                window.location.href = "../index.html"

            });
    }

    const UserSignIn = (email, password) => {
        auth.signInWithEmailAndPassword(email, password)
            .then( () => {
                const user = auth.currentUser;
                const database_ref = database.ref();

                const user_data = {
                    last_login: Date.now()
                }

                const db_ref = database.ref('users/' + user.uid);
                db_ref.on('value', (userSnapshot) => {
                    const data = userSnapshot.val().role;
                    console.log(data)
                    window.localStorage.setItem("user", data);
                });

                database_ref.child('users/' + user.uid).update(user_data);

                window.location.href = "../index.html"

            })

    }

    window.addEventListener('load', () => {
        let user = window.localStorage.getItem("user");
        console.log(user)
        if (user !== null)
        {
            console.log(user == "admin")
            if (user == "admin")
                {
                    addSettings();

                }
                else
                {
                    closeAccess();
                }
        }
        else
        {
            closeAccess()
        }
    });



    function addSettings()
    {
        console.log('!!!!!!')
        let nav = document.querySelectorAll('nav');
        nav.forEach(element =>
        {
           element.innerHTML += `<a href = "/pages/admin.html">настройки</a>`;
        });
    }

    function closeAccess()
    {
        if (window.location.href === "/pages/admin.html")
        {
            alert("У вас недостаточно прав доступа для перехода на этот раздел сайта!");
            window.location.href = "../index.html";
        }
    }


    function validate_mail(email)
    {
        let expression = /^[^@]+@\w+(\.\w+)+\w$/
        if (expression.test(email) == true)
        {
            return true
        }
        else
        {
            return false
        }
    }

    function validate_password(password)
    {
        if (password < 6)
        {
            return false
        }
        else{
            return true
        }
    }


});