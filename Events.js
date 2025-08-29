const Events = [
  {
    id: "Event1",
    title: "Welcome to the Events",
    date: "June 22, 2025",
    author: "AAC Board",
    authorImg: "https://randomuser.me/api/portraits/men/32.jpg",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    summary: "Stay tuned for our latest updates and articles! We’ll be sharing stories, news, and event recaps from the Afghanistan Association Club at Georgetown University.",
    content: `<p>Stay tuned for our latest updates and articles! We’ll be sharing stories, news, and event recaps from the Afghanistan Association Club at Georgetown University.</p>`,
    tags: ["Club News", "Events"]
  },
  {
    id: "Event2",
    title: "Spring Welcome Event Recap",
    date: "June 10, 2025",
    author: "AAC Events",
    authorImg: "https://randomuser.me/api/portraits/women/44.jpg",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    summary: "Our annual spring event brought together new and returning members for a night of culture and community.",
    content: `<p>Our annual spring event brought together new and returning members for a night of culture and community. Thank you to everyone who joined us!</p>`,
    tags: ["Events"]
  },
  {
    id: "Event3",
    title: "AAC at Georgetown Day",
    date: "May 28, 2025",
    author: "AAC Team",
    authorImg: "https://randomuser.me/api/portraits/men/45.jpg",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    summary: "See how AAC participated in this year’s Georgetown Day with food, music, and fun activities.",
    content: `<p>See how AAC participated in this year’s Georgetown Day with food, music, and fun activities. It was a wonderful celebration!</p>`,
    tags: ["Events"]
  },
  {
    id: "Event4",
    title: "Meet the New Board",
    date: "May 15, 2025",
    author: "AAC Board",
    authorImg: "https://randomuser.me/api/portraits/women/46.jpg",
    image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=400&q=80",
    summary: "Introducing the new AAC board members for 2025-2026. Learn more about their vision for the club.",
    content: `<p>Introducing the new AAC board members for 2025-2026. Learn more about their vision for the club and upcoming plans!</p>`,
    tags: ["Club News"]
  }
];

// Render Event list
function renderEventList(excludeId) {
  const EventList = document.getElementById('Event-list');
  EventList.innerHTML = '';
  Events
    .filter(Event => Event.id !== excludeId)
    .slice(0, 3)
    .forEach(Event => {
      EventList.innerHTML += `
        <div class="col-md-4 mb-4">
          <a href="#${Event.id}" style="text-decoration:none;color:inherit;">
            <div class="card border-0 shadow-sm h-100">
              <img src="${Event.image}" class="card-img-top" alt="${Event.title}">
              <div class="card-body">
                <h5 class="card-title mb-1">${Event.title}</h5>
                <p class="card-text text-muted small">${Event.summary}</p>
                <div>
                  <img src="${Event.authorImg}" alt="Author" style="width:24px;height:24px;border-radius:50%;margin-right:6px;">
                  <small class="text-muted">${Event.author} &middot; ${Event.date}</small>
                </div>
              </div>
            </div>
          </a>
        </div>
      `;
    });
}

// Render single Event
function renderEvent(Event) {
  const EventContent = document.getElementById('Event-content');
  EventContent.innerHTML = `
    <div class="card border-0 shadow-sm mb-4">
      <img src="${Event.image}" class="card-img-top img-fluid rounded-0" alt="${Event.title}">
      <div class="card-body">
        <h2 class="card-title mb-2">${Event.title}</h2>
        <div class="mb-3 text-muted small">
          <span class="mr-3"><i class="far fa-calendar-alt"></i> ${Event.date}</span>
          <span class="mr-3"><i class="far fa-folder"></i> ${Event.tags.map(tag => `<span class="badge badge-primary">${tag}</span>`).join(' ')}</span>
        </div>
        ${Event.content}
      </div>
    </div>
  `;
  document.getElementById('recent-title').textContent = "Recent Events";
  renderEventList(Event.id);
}

// Render all Events as grid (default view)
function renderAllEvents() {
  document.getElementById('Event-content').innerHTML = '';
  document.getElementById('recent-title').textContent = "Latest stories";
  const EventList = document.getElementById('Event-list');
  EventList.innerHTML = '';
  Events.forEach(Event => {
    EventList.innerHTML += `
      <div class="col-md-4 mb-4">
        <a href="#${Event.id}" style="text-decoration:none;color:inherit;">
          <div class="card border-0 shadow-sm h-100">
            <img src="${Event.image}" class="card-img-top" alt="${Event.title}">
            <div class="card-body">
              <h5 class="card-title mb-1">${Event.title}</h5>
              <p class="card-text text-muted small">${Event.summary}</p>
              <div>
                <img src="${Event.authorImg}" alt="Author" style="width:24px;height:24px;border-radius:50%;margin-right:6px;">
                <small class="text-muted">${Event.author} &middot; ${Event.date}</small>
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
  });
}

// Handle hash change to show Event or all
function handleHash() {
  const id = location.hash.replace('#', '');
  const Event = Events.find(b => b.id === id);
  if (Event) {
    renderEvent(Event);
  } else {
    renderAllEvents();
  }
}

// Initial render
window.addEventListener('DOMContentLoaded', handleHash);
window.addEventListener('hashchange', handleHash);
// Hamburger menu toggle
