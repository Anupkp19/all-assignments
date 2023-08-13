let vDOM = []; // Our initial vDOM is an empty array

function createDomElements() {

    const parent = document.getElementById('mainArea');
  
    // Get current DOM elements
    const currentElements = Array.from(parent.children);
    
    // Track changes
    let added = 0;
    let deleted = 0;
    let updated = 0;
  
    vDOM.forEach(vNode => {
  
      // Try to find matching element in current DOM
      const existingEl = currentElements.find(el => el.dataset.id === vNode.id);
  
      if (existingEl) {
        // If element exists, update it
        existingEl.children[0].innerHTML = vNode.title; 
        existingEl.children[1].innerHTML = vNode.description;
  
        // Remove from currentElements array
        currentElements.splice(currentElements.indexOf(existingEl), 1);
        
        updated++;
  
      } else {
        // If element doesn't exist, create it
        const newEl = document.createElement('div');
        newEl.dataset.id = vNode.id;
  
        const titleEl = document.createElement('h3');
        titleEl.innerHTML = vNode.title;
  
        const descEl = document.createElement('p');
        descEl.innerHTML = vNode.description;
  
        newEl.appendChild(titleEl);
        newEl.appendChild(descEl);
  
        parent.appendChild(newEl);
  
        added++;
      }
  
    });
  
    // Any elements left in currentElements need to be removed
    currentElements.forEach(el => {
      parent.removeChild(el);
      deleted++;
    });
  
  }

  function updateDom(data) {
    vDOM = data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
      };
    });
  }
  window.setInterval(() => {
    let todos = [];
    for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
      todos.push({
        title: "Go to gym",
        description: "Go to gym from 5",
        id: i + 1,
      });
    }
  
    updateDom(todos);
  }, 5000);
  
  window.setInterval(() => {
    createDomElements();
  }, 1000);