export const saveUser = user =>{
    const currentUser = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL
    }
    fetch(`https://summer-camp-school-server-eosin.vercel.app/users/${user.email}`, {
        method: "PUT",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data);
    })
}