document.addEventListener('DOMContentLoaded', () => {
    const elimina = document.querySelectorAll('.elimina')
    const publish = document.querySelectorAll('.publish')

    elimina.forEach(bottone => {
        bottone.addEventListener('click', (event) => {
            const id = bottone.getAttribute('data-id')
            fetch(`/api/elimina/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                window.location.reload()
            })
            .catch(error => {
                console.error(error)
            })
        })
    })

    publish.forEach(bottone => {
        bottone.addEventListener('click', (event) => {
            const id = bottone.getAttribute('data-id')
            fetch(`/api/publish/${id}`, {
                method: 'PUT'
            })
            .then(() => {
                window.location.reload()
            })
            .catch(error => {
                console.error(error)
            })
        })
    })
})