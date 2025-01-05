document.addEventListener('DOMContentLoaded', () => {
    const elimina = document.querySelectorAll('.elimina')
    const publish = document.querySelectorAll('.publish')
    const file = document.querySelector('#file')
    const labelfile = document.querySelector('#img')
    if (file){
        labelfile.addEventListener('click', (event) => {
            file.click()
        })
        file.addEventListener('change', (event) => {
            labelfile.innerHTML = file.files[0].name
        })
    }

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