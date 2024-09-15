export type UserFields = {
    username: string;
};

export type UserData = {
    pk: number;
    fields: UserFields;
};

export type UserResponse = {
    user: UserData;
};

export async function createUser(name: string, pass: string) : Promise<boolean> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${name}&password=${pass}`
    };
    
    return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:8000/create-user/`, requestOptions)
        .then((response) => resolve(response.status == 201))
        .catch((err) => {
           console.log(err.message);
           reject();
        });
    });
}

export async function loginUser(name: string, pass: string) : Promise<string | null> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${name}&password=${pass}`
    };

    return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:8000/login-user/`, requestOptions)
        .then((response) => {
            if (response.status == 200)
                resolve(response.text());
            else
                resolve(null);
        })
        .catch((err) => {
           console.log(err.message);
           reject();
        });
    });
}

export async function logoutUser() : Promise<boolean> {
    let token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Token ${token}`
        },
    };

    return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:8000/logout-user/`, requestOptions)
        .then((response) => resolve(response.status == 200))
        .catch((err) => {
           console.log(err.message);
           reject();
        });
    });
}


export async function getUser() : Promise<UserData | null> {
    let token = localStorage.getItem('token');
    console.log(`get user token=${token}`);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        },
    };

    return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:8000/get-user/`, requestOptions)
        .then((response) => {
            if (response.status != 200)
                resolve(null);
            else {
                // resolve(response.json());
                response.json().then(arr => resolve(arr[0]));
            }
        })
        .catch((err) => {
           console.log(err.message);
           reject();
        });
    });
}