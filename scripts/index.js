function searchBtnHandler() {
    let text = document.getElementById('search-phone').value
    phoneSearch(text)
}

const phoneSearch = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phoneList = data.data
    // console.log(phoneList)
    document.getElementById('display-phone-card').innerText = ''
    displayPhoneCard(phoneList)
}

function displayPhoneCard(list) {
    let card = document.getElementById('display-phone-card')

    list.forEach(phoneList => {
        let div = document.createElement('div')
        div.innerHTML = `
    <div class="card bg-base-100 w-96 shadow-xl">
                <figure class="px-10 pt-10">
                    <img src="${phoneList.image}" alt="Shoes"
                        class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${phoneList.phone_name}</h2>
                    <p></p>
                    <div class="card-actions">
                        <button  onclick="phoneDetailsBtn('${phoneList.slug}') ; " class="btn btn-primary">Show Details</button>
                    </div>
                </div>
            </div>
    `;
        card.appendChild(div)
    });
}

function phoneDetailsBtn(id) {
    document.getElementById('phone_details').innerText = ''
    phoneDetail(id)
    phone_details.showModal()
}

const phoneDetail = async (id) => {
    let res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    let data = await res.json()
    let details = data.data
    // console.log(details)
    creatModals(details)

}

function creatModals(detail) {
    let modal = document.getElementById('phone_details')
    let div = document.createElement('div')
    div.classList = 'modal-box'
    div.innerHTML = `
            <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <div class="card bg-base-100 w-96 shadow-xl">
                <figure class="px-10 pt-10">
                    <img src="${detail.image}" alt="Shoes"
                        class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${detail.name}</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <p>Storage: ${detail?.mainFeatures?.storage || 'data not available'}</p>
                    <p>Display Size: ${detail?.mainFeatures?.displaySize || 'data not available'}</p>
                    <p>Chipset: ${detail?.mainFeatures?.chipSet || 'data not available'}</p>
                    <p>Memory: ${detail?.mainFeatures?.memory || 'data not available'}</p>
                    <p>Slug: ${detail?.slug || 'data not available'}</p>
                    <p>Release data: ${detail?.releaseDate || 'data not available'}</p>
                    <p>Brand: ${detail?.brand || 'data not available'}</p>
                    <p>GPS: ${detail?.others?.GPS || 'data not available'}</p>
                </div>
            </div>
`
    modal.appendChild(div)
}