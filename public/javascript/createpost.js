async function newPostHandler(event) {
  event.preventDefault();

  const post_body = document.querySelector('.postTextArea').value;
  console.log(post_body)
  const response = await fetch('/api/single-group', {
      method: 'POST',
      body: JSON.stringify({
          post_body
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });

  if(response.ok) {
      document.location.replace('/group')
  } else {
      alert(response.statusText);
  }
  
}

document.querySelector('.postBtn').addEventListener('click', newPostHandler);