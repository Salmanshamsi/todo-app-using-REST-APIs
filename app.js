const baseurl = "https://dizzy-red-betta.cyclic.app/";


function showLoadingSpinner() {
  document.getElementById('loadingSpinner').style.display = 'block';
}

// Function to hide the loading spinner
function hideLoadingSpinner() {
  document.getElementById('loadingSpinner').style.display = 'none';
}


const getData =  async () => {

  let data = [];
 
  try{

     await  fetch(`${baseurl}todo/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(resp => {
        data = resp;
        // console.log(resp);
      })
      .catch(error => {
        console.error('Fetch Error:', error);
      });


      }catch(error){
        throw new(error)
      }

      return data;


}


const renderData = async () => {
   const dataPromise = getData();
   const data = await dataPromise.then((resp) => {
    return resp;
  });


  const ul = document.getElementById('userDataList');
  ul.innerHTML = ''; // Clear the list before re-rendering

  data.forEach((CurEl) => {
    const listItem = document.createElement('li');
    listItem.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center',
      'border-start-0',
      'border-top-0',
      'border-end-0',
      'border-bottom',
      'rounded-0',
      'mb-2'
    );
    listItem.innerHTML = `
      <div class="d-flex align-items-center">
        ${CurEl.data}
      </div>
      <div>
        <button onclick="deleteData('${CurEl.id}')" class="border-0 bg-transparent" >
            <i class="fas fa-times text-primary"></i>    
        </button>
        <button onclick="modal_handler('${CurEl.id}')"  class="border-0 bg-transparent ms-3" data-toggle='modal' data-target='#updateModal' >
            <i class="fa-solid fa-pen-to-square"></i>     
        </button>
      </div>
    `;

    ul.appendChild(listItem);
  });
};



const addData = async () => {


      let inputData = document.getElementById('searchInput').value;
  
      try{

      if(inputData !== ""){

       // Make a POST request with data
        fetch(`${baseurl}todo/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data : inputData})
        })
          .then(response => response.text())
          .then(data => {
          
            if(data === "data added"){
              location.reload()
            }
            console.log(data)
          })

      }else{
        alert("type something");
      }

    }catch(err){throw new (err)}

};

document.getElementById('userForm').addEventListener('submit', (e) => {
  e.preventDefault();
  addData();
});


const deleteData = (idToDelete) => {

    fetch(`${baseurl}todo/${idToDelete}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      location.reload()
      console.log(response.text());
    })

};



const updateData = async (idToUpdate, updatedData) => {
  try {
    const response = await fetch(`${baseurl}todo/${idToUpdate}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: updatedData })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const responseData = await response.text();
    console.log(responseData); // Handle the parsed JSON response data
    location.reload();
  } catch (error) {
    console.error('Error updating data:', error);
  }
};


const modal_handler = (id) => {

    const modal = document.getElementById('modal-save');
    modal.addEventListener('click', async (e) => {
      e.preventDefault();
      const updatedData = document.getElementById('modal-inp').value;
      console.log(updatedData);
      await updateData(id, updatedData);
      closeModal();

    });

}


function closeModal() {
    $('#updateModal').modal('hide');
  }


// Initial rendering
renderData();
showLoadingSpinner()