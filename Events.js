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

// Helper to parse event date (assumes format: "Month DD, YYYY")
function parseEventDate(dateStr) {
  return new Date(dateStr);
}
function isFutureEvent(event) {
  const today = new Date();
  const eventDate = parseEventDate(event.date);
  // Consider events today as future
  return eventDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
}
function isPastEvent(event) {
  return !isFutureEvent(event);
}

// Render Event list for a section (future or past)
function renderEventListSection(section, excludeId) {
  const EventList = document.getElementById(`Event-list-${section}`);
  EventList.innerHTML = '';
  Events
    .filter(Event => (section === 'future' ? isFutureEvent(Event) : isPastEvent(Event)))
    .filter(Event => Event.id !== excludeId)
    .slice(0, 3)
    .forEach(Event => {
      EventList.innerHTML += `
        <div class="col-md-4 mb-4">
          <a href="#${Event.id}-${section}" style="text-decoration:none;color:inherit;">
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

// Render single Event for a section
function renderEventSection(Event, section) {
  const EventContent = document.getElementById(`Event-content-${section}`);
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
  document.getElementById(`recent-title-${section}`).textContent = section === 'future' ? "Upcoming Events" : "Past Events";
  renderEventListSection(section, Event.id);
}

// Render all Events as grid for a section (default view)
function renderAllEventsSection(section) {
  document.getElementById(`Event-content-${section}`).innerHTML = '';
  document.getElementById(`recent-title-${section}`).textContent = section === 'future' ? "Upcoming Events" : "Past Events";
  const EventList = document.getElementById(`Event-list-${section}`);
  EventList.innerHTML = '';
  Events
    .filter(Event => (section === 'future' ? isFutureEvent(Event) : isPastEvent(Event)))
    .forEach(Event => {
      EventList.innerHTML += `
        <div class="col-md-4 mb-4">
          <a href="#${Event.id}-${section}" style="text-decoration:none;color:inherit;">
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

// Handle hash change to show Event or all for correct section
function handleHash() {
  const hash = location.hash.replace('#', '');
  let section = 'future';
  let id = '';
  if (hash.endsWith('-past')) {
    section = 'past';
    id = hash.replace('-past', '');
  } else if (hash.endsWith('-future')) {
    section = 'future';
    id = hash.replace('-future', '');
  }
  // Hide/show sections
  document.getElementById('future-events-section').style.display = section === 'future' ? '' : 'none';
  document.getElementById('past-events-section').style.display = section === 'past' ? '' : 'none';
  // Toggle button states
  document.getElementById('show-future').classList.toggle('active', section === 'future');
  document.getElementById('show-future').classList.toggle('btn-primary', section === 'future');
  document.getElementById('show-future').classList.toggle('btn-outline-primary', section !== 'future');
  document.getElementById('show-past').classList.toggle('active', section === 'past');
  document.getElementById('show-past').classList.toggle('btn-primary', section === 'past');
  document.getElementById('show-past').classList.toggle('btn-outline-primary', section !== 'past');

  if (id) {
    const Event = Events.find(b => b.id === id && (section === 'future' ? isFutureEvent(b) : isPastEvent(b)));
    if (Event) {
      renderEventSection(Event, section);
      return;
    }
  }
  renderAllEventsSection(section);
}

// Initial render
window.addEventListener('DOMContentLoaded', handleHash);
window.addEventListener('hashchange', handleHash);

// Add click handlers for toggle buttons
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('show-future').addEventListener('click', function() {
    location.hash = '';
    document.getElementById('future-events-section').style.display = '';
    document.getElementById('past-events-section').style.display = 'none';
    renderAllEventsSection('future');
  });
  document.getElementById('show-past').addEventListener('click', function() {
    location.hash = '';
    document.getElementById('future-events-section').style.display = 'none';
    document.getElementById('past-events-section').style.display = '';
    renderAllEventsSection('past');
  });
});
