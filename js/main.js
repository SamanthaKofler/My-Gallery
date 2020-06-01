'use strict';

function initPage() {
    createProjs();
    renderProjs()
}

function renderProjs() {
    var projs = getProjs();
    var strHTMLs = projs.map(function (proj) {
        return `<div class="col-md-4 col-sm-6 portfolio-item" onclick="renderModal('${proj.id}')">
                  <a class="portfolio-link" data-toggle="modal" href="#portfolioModal-${proj.id}">
                    <div class="portfolio-hover">
                      <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                      </div>
                    </div>
                    <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="">
                  </a>
                  <div class="portfolio-caption">
                    <h4>${proj.name}</h4>
                    <p class="text-muted">${proj.labels.join(', ')}</p>
                  </div>
                </div>`
    });
    document.querySelector('.projs-container').innerHTML = strHTMLs.join('');
}

function renderModal(projId) {
    var proj = getProjById(projId);
    var strHTML = `<div class="portfolio-modal modal fade" id="portfolioModal-${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
          <div class="close-modal" data-dismiss="modal">
          <div class="lr">
          <div class="rl"></div>
          </div>
          </div>
          <div class="container">
            <div class="row">
            <div class="col-lg-8 mx-auto">
            <div class="modal-body">
            <!-- Project Details Go Here -->
            <h2>${proj.name}</h2>
            <p class="item-intro text-muted">${proj.title}</p>
                    <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}.jpg" alt="">
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                    <li>Date:${proj.publishedAt}</li>
                    <li>Client: Threads</li>
                    <li>Category: ${proj.labels.join(', ')}</li>
                    </ul>
                    <a href="${proj.url}">Visit the project</a>
                    <br>
                    <br>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                        Close Project</button>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>`

    document.querySelector('.modal-projs').innerHTML = strHTML;
}

function onContactMe() {
    var email = document.querySelector('.email').value;
    var subject = document.querySelector('.subject').value;
    var msg = document.querySelector('.message-box').value;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=samantha_kofler@outlook.com&su=${subject}&body=${msg}`)
    email = '';
    subject = '';
    msg = '';
}
