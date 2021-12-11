async function newGroupHandler(event) {
    event.preventDefault();
    console.log('Did this work?');

    const group_name = document.querySelector('input[name=group_name]').value;
    // const user_id = 

    const response = await fetch('/api/groups', {
        method: 'POST',
        body: JSON.stringify({
            group_name
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

document.querySelector('#subButton').addEventListener('click', newGroupHandler);