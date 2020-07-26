window.addEventListener('load', () => {

    let search = document.querySelector('.search')
    let resultSearchPeople = document.querySelector('.resultSearchPeople')
    let statistics = document.querySelector('.statistics')

    let allPeople = []
    let allPeopleAfterSearch = []
    let totalMale = 0
    let totalFemale = 0
    let totalAverageAge = 0
    let numberSumAge = 0

    render()

    function render() {
        api()
        handleUser()
        handleStatistics()
        search.addEventListener('keyup', getSearch)
    }

    async function api() {

        let allSearch = await (await fetch('http://localhost:3000/results')).json()

        allPeople = allSearch.map(people => {
            return {
                name: people.name.first + ' ' + people.name.last,
                age: people.dob.age,
                gender: people.gender,
                picture: people.picture.medium,
            }
        })
        if (allPeopleAfterSearch.length === 0) {
            allPeopleAfterSearch = allPeople
        }

        handleUser()
        handleStatistics()

    }

    function handleUser() {
        resultSearchPeople.innerHTML = ''
        resultSearchPeople.innerHTML = `<label class="resultLabel"> ${allPeopleAfterSearch.length} usuários encontrados</label>`

        allPeopleAfterSearch.forEach(people => {

            const { name, picture } = people

            resultSearchPeople.innerHTML += `
            
            <div class="resultContent">
                <img class="resultImage"
                    src="${picture}"
                    alt="user">
                <p class="resultName">${name}</p>
            </div>
            `
        })
    }

    function handleStatistics() {
        numberOfMan()
        numberOfWoman()
        someAges()
        averageAge()

        statistics.innerHTML = ''

        statistics.innerHTML += `
            <label class="statisticsLabel"> Estatísticas </label>
            <p>Sexo masculino: ${totalMale.length}</p>
            <p>Sexo feminino: ${totalFemale.length}</p>
            <p>Soma das idades:${numberSumAge}</p>
            <p>Media das idades: ${totalAverageAge}</p>
        `
    }

    function numberOfMan() {

        totalMale = allPeopleAfterSearch.filter(people => {
            return people.gender === 'male'
        })

    }

    function numberOfWoman() {

        totalFemale = allPeopleAfterSearch.filter(people => {
            return people.gender === 'female'
        })

    }

    function someAges() {

        numberSumAge = allPeopleAfterSearch.reduce((accumulator, current) => {
            return accumulator + current.age
        }, 0)

    }

    function averageAge() {

        totalAverageAge = numberSumAge / allPeopleAfterSearch.length

    }

    function getSearch(event) {

        allPeopleAfterSearch = allPeople.filter(people => {
            let pessoa = people.name.toLowerCase()
            return pessoa.includes(event.target.value)
        })

        render()

    }

})