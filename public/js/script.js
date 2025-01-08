document.addEventListener('DOMContentLoaded', () => {

    const timer = document.querySelector("#timer")
    if (timer) {
        const interval = setInterval(decrTimer, 1000)
        function decrTimer() {
            timer.textContent--
            if (timer.textContent <= 0) {
                clearInterval(interval)
                window.location.href = "/"
            }
        }
    }

    const ext = document.querySelector("#ext")
    const file = document.querySelector('#file')
    const labelfile = document.querySelector('#img')
    if (file) {
        ext.style.display = "none"
        labelfile.addEventListener('click', (event) => {
            file.click()
        })
        file.addEventListener('change', (event) => {
            if (/\.(jpg|jpeg|png)$/i.test(file.files[0].name)) {
                if(file.files[0].name.length > 23){
                    filename = file.files[0].name.slice(0,17) + ".." + file.files[0].name.slice(-4)
                }else{
                    filename = file.files[0].name
                }
                ext.style.display = "none"
            } else {
                file.value = ""
                ext.style.display = "block"
                ext.textContent = "Seleziona un file valido (jpg, jpeg, png)"
                filename = "Scegli immagine"
            }
            labelfile.innerHTML = filename
        })
    }

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