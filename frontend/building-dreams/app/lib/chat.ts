
export type ChatMessage = {
    user: number;
    // me: boolean;
    username: string;
    message: string;
};

export type ChatListing = {
};

export type ChatResponse = {
    pk: number;
    fields: ChatListing;
};

export async function createChat() : Promise<string | null> {
    let token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Token ${token}`
        },
    };
    
    return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:8000/create-chat/`, requestOptions)
        .then((response) => {
            if (response.status == 200)
                resolve(response.text());
            return null;
        })
        .catch((err) => {
           console.log(err.message);
           reject();
        });
    });
}


export async function getChats() : Promise<ChatResponse[]> {
    let token = localStorage.getItem('token');

    const requestOptions = {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Token ${token}`
        },
    };

    return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:8000/get-chats/`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
           console.log(err.message);
           reject();
        });
    });
}

export async function getChatHistory() : Promise<string | null> {
    return null;
}