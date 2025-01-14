const display = () => {
    // alert("Hello")

    axios.get('/getData')
        .then(response => {
           alert("GetData Function was executed!")
        })
        .catch(error => {
            console.error(error)
        });
}

const deleteUser = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
        axios.delete(`/deleteUser/${id}`)
            .then(response => {
                if (response.status === 200) {
                    alert("User deleted successfully!")
                    window.location.reload()
                } else {
                    alert("Failed to delete user")
                }
            })
            .catch(error => {
                console.error(error)
                alert("An error occurred while deleting user")
            });
    }
}
