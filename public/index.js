function addItem(content, status) {
  if (content === '') {
    return $('.err').removeClass('hidden').addClass('animated bounceIn');
  }
  let data = { content, status };
  fetch('/todo/data', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.statusCode == 200) {
        let items = `<li data-id='${res.data._id}' class='animated flipInX'><div class='checkbox'><span class='close'><i class='fa fa-times'></i></span><label><span class='checkbox-mask'></span><input type='checkbox'/>${res.data.content}</label></div></li>`;
        $('.err').addClass('hidden');
        $('input[name=content]').val('').attr('placeholder', '✍️ Add item...');
        $('.todo-list').append(items);
      } else {
        alert('Err');
      }
    });
}

function deleteTodo(_id) {
  fetch(`/todo/data/${_id}`, {
    method: 'DELETE',
  });
}

function setToDone(_id) {
  fetch(`/todo/data/${_id}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.data.status == 'new') var data = { status: 'done' };
      else var data = { status: 'new' };
      fetch(`/todo/data/${_id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
}

$(function () {
  var err = $('.err'),
    formControl = $('.form-control');

  $('.add-btn').on('click', function () {
    let itemVal = $('input[name=content]').val();
    let status = $('input[name=status]').val();
    addItem(itemVal, status);
    formControl.focus();
  });

  $('.todo-list').on('click', '.close', function () {
    var box = $(this).parent().parent();

    if ($('.todo-list li').length == 1) {
      box.removeClass('animated flipInX').addClass('animated bounceOutLeft');
      setTimeout(function () {
        box.remove();
      }, 500);
    } else {
      box.removeClass('animated flipInX').addClass('animated bounceOutLeft');
      setTimeout(function () {
        box.remove();
      }, 500);
    }

    deleteTodo(box.data().id);
  });

  $('.todo-list').on('click', 'input[type="checkbox"]', function () {
    var li = $(this).parent().parent().parent();
    setToDone(li.data().id);
    li.toggleClass('danger');
    li.toggleClass('animated flipInX');

    setTimeout(function () {
      li.removeClass('animated flipInX');
    }, 500);
  });
});
