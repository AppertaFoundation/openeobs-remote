// Generated by CoffeeScript 1.8.0
(function() {
  var NHLib, NHMobile, NHMobileForm, NHModal, Promise,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  NHLib = (function() {
    NHLib.date_format = '%Y-%m-%d H:M:S';

    function NHLib() {
      this.leading_zero = __bind(this.leading_zero, this);
      this.get_timestamp = __bind(this.get_timestamp, this);
      this.date_to_string = __bind(this.date_to_string, this);
      this.date_from_string = __bind(this.date_from_string, this);
      this.version = '0.0.1';
    }

    NHLib.prototype.date_from_string = function(date_string) {
      return new Date(date_string);
    };

    NHLib.prototype.date_to_string = function(date) {
      return date.getFullYear() + "-" + this.leading_zero(date.getMonth() + 1) + "-" + this.leading_zero(date.getDate()) + " " + this.leading_zero(date.getHours()) + ":" + this.leading_zero(date.getMinutes()) + ":" + this.leading_zero(date.getSeconds());
    };

    NHLib.prototype.get_timestamp = function() {
      return Math.round(new Date().getTime() / 1000);
    };

    NHLib.prototype.leading_zero = function(date_element) {
      return ("0" + date_element).slice(-2);
    };

    return NHLib;

  })();

  if (!window.NH) {
    window.NH = {};
  }

  window.NH.NHLib = NHLib;

  Promise = (function() {
    Promise.when = function() {
      var args, num_uncompleted, promise, task, task_id, tasks, _fn, _i, _len;
      tasks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      num_uncompleted = tasks.length;
      args = new Array(num_uncompleted);
      promise = new Promise();
      _fn = function(task_id) {
        return task.then(function() {
          args[task_id] = Array.prototype.slice.call(arguments);
          num_uncompleted--;
          if (num_uncompleted === 0) {
            return promise.complete.apply(promise, args);
          }
        });
      };
      for (task_id = _i = 0, _len = tasks.length; _i < _len; task_id = ++_i) {
        task = tasks[task_id];
        _fn(task_id);
      }
      return promise;
    };

    function Promise() {
      this.completed = false;
      this.callbacks = [];
    }

    Promise.prototype.complete = function() {
      var callback, _i, _len, _ref, _results;
      this.completed = true;
      this.data = arguments;
      _ref = this.callbacks;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback.apply(callback, arguments));
      }
      return _results;
    };

    Promise.prototype.then = function(callback) {
      if (this.completed === true) {
        callback.apply(callback, this.data);
        return;
      }
      return this.callbacks.push(callback);
    };

    return Promise;

  })();

  NHMobile = (function(_super) {
    __extends(NHMobile, _super);

    NHMobile.prototype.process_request = function(verb, resource, data) {
      var promise, req;
      promise = new Promise();
      req = new XMLHttpRequest();
      req.addEventListener('readystatechange', function() {
        var successResultCodes, _ref;
        if (req.readyState === 4) {
          successResultCodes = [200, 304];
          if (_ref = req.status, __indexOf.call(successResultCodes, _ref) >= 0) {
            data = eval('[' + req.responseText + ']');
            console.log('data: ', data);
            return promise.complete(data);
          } else {
            new NHModal('data_error', 'Error while processing request', '<div class="block">The server returned an error while processing the request. Please check your input and resubmit</div>', ['<a href="#" data-action="close" data-target="data_error">Ok</a>'], 0, document.getElementsByTagName('body')[0]);
            return promise.complete(false);
          }
        }
      });
      req.open(verb, resource, true);
      if (data) {
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        req.send(data);
      } else {
        req.send();
      }
      return promise;
    };

    function NHMobile() {
      this.fullscreen_patient_info = __bind(this.fullscreen_patient_info, this);
      this.get_patient_info = __bind(this.get_patient_info, this);
      this.call_resource = __bind(this.call_resource, this);
      var self;
      this.urls = frontend_routes;
      self = this;
      NHMobile.__super__.constructor.call(this);
    }

    NHMobile.prototype.call_resource = function(url_object, data) {
      return this.process_request(url_object.method, url_object.url, data);
    };

    NHMobile.prototype.get_patient_info = function(patient_id, self) {
      return Promise.when(this.process_request('GET', this.urls.json_patient_info(patient_id).url)).then(function(server_data) {
        var data, patientDOB, patient_details, patient_name;
        data = server_data[0][0];
        patient_name = '';
        patient_details = '';
        if (data.full_name) {
          patient_name += " " + data.full_name;
        }
        if (data.gender) {
          patient_name += '<span class="alignright">' + data.gender + '</span>';
        }
        if (data.dob) {
          patientDOB = self.date_from_string(data.dob);
          patient_details += "<dt>DOB:</dt><dd>" + self.date_to_string(patientDOB) + "</dd>";
        }
        if (data.location) {
          patient_details += "<dt>Location:</dt><dd>" + data.location;
        }
        if (data.parent_location) {
          patient_details += ',' + data.parent_location + '</dd>';
        } else {
          patient_details += '</dd>';
        }
        if (data.ews_score) {
          patient_details += "<dt class='twoline'>Latest Score:</dt><dd class='twoline'>" + data.ews_score + "</dd>";
        }
        if (data.other_identifier) {
          patient_details += "<dt>Hospital ID:</dt><dd>" + data.other_identifier + "</dd>";
        }
        if (data.patient_id) {
          patient_details += "<dt>NHS Number:</dt><dd>" + data.patient_id + "</dd>";
        }
        patient_details = '<dl>' + patient_details + '</dl><p><a href="' + self.urls['single_patient'](patient_id).url + '" id="patient_obs_fullscreen" class="button patient_obs">View Patient Observation Data</a></p>';
        new NHModal('patient_info', patient_name, patient_details, ['<a href="#" data-target="patient_info" data-action="close">Cancel</a>'], 0, document.getElementsByTagName('body')[0]);
        return document.getElementById('patient_obs_fullscreen').addEventListener('click', self.fullscreen_patient_info);
      });
    };

    NHMobile.prototype.fullscreen_patient_info = function(event) {
      var container, options, options_close, page;
      event.preventDefault();
      container = document.createElement('div');
      container.setAttribute('class', 'full-modal');
      options = document.createElement('p');
      options_close = document.createElement('a');
      options_close.setAttribute('href', '#');
      options_close.setAttribute('id', 'closeFullModal');
      options_close.innerText = 'Close popup';
      options_close.addEventListener('click', function() {
        return document.getElementsByTagName('body')[0].removeChild(document.getElementsByClassName('full-modal')[0]);
      });
      options.appendChild(options_close);
      container.appendChild(options);
      page = document.createElement('iframe');
      page.setAttribute('src', event.srcElement.getAttribute('href'));
      container.appendChild(page);
      return document.getElementsByTagName('body')[0].appendChild(container);
    };

    return NHMobile;

  })(NHLib);

  if (!window.NH) {
    window.NH = {};
  }

  if (typeof window !== "undefined" && window !== null) {
    window.NH.NHMobile = NHMobile;
  }

  NHMobileForm = (function(_super) {
    __extends(NHMobileForm, _super);

    function NHMobileForm() {
      this.cancel_notification = __bind(this.cancel_notification, this);
      this.handle_timeout = __bind(this.handle_timeout, this);
      this.submit_observation = __bind(this.submit_observation, this);
      this.display_partial_reasons = __bind(this.display_partial_reasons, this);
      this.submit = __bind(this.submit, this);
      this.trigger_actions = __bind(this.trigger_actions, this);
      this.validate = __bind(this.validate, this);
      var input, self, _fn, _i, _len, _ref, _ref1;
      this.form = (_ref = document.getElementsByTagName('form')) != null ? _ref[0] : void 0;
      this.form_timeout = 240 * 1000;
      this.patient_name_el = document.getElementById('patientName').getElementsByTagName('a')[0];
      this.patient_name = function() {
        return this.patient_name_el.text;
      };
      self = this;
      NHMobileForm.__super__.constructor.call(this);
      _ref1 = this.form.elements;
      _fn = function() {
        switch (input.localName) {
          case 'input':
            switch (input.type) {
              case 'number':
                return input.addEventListener('change', self.validate);
              case 'submit':
                return input.addEventListener('click', self.submit);
              case 'reset':
                return input.addEventListener('click', self.cancel_notification);
            }
            break;
          case 'select':
            return input.addEventListener('change', self.trigger_actions);
        }
      };
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        input = _ref1[_i];
        _fn();
      }
      document.addEventListener('form_timeout', function(event) {
        return self.handle_timeout(self, self.form.getAttribute('task-id'));
      });
      window.timeout_func = function() {
        var timeout;
        timeout = new CustomEvent('form_timeout', {
          'detail': 'form timed out'
        });
        return document.dispatchEvent(timeout);
      };
      window.form_timeout = setTimeout(window.timeout_func, this.form_timeout);
      document.addEventListener('post_score_submit', function(event) {
        var element, endpoint, form_elements;
        form_elements = (function() {
          var _j, _len1, _ref2, _results;
          _ref2 = self.form.elements;
          _results = [];
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            element = _ref2[_j];
            if (!element.classList.contains('exclude')) {
              _results.push(element);
            }
          }
          return _results;
        })();
        endpoint = event.detail;
        return self.submit_observation(self, form_elements, endpoint, self.form.getAttribute('ajax-args'));
      });
      document.addEventListener('partial_submit', function(event) {
        var cover, details, dialog_id, element, form_elements, reason;
        form_elements = (function() {
          var _j, _len1, _ref2, _results;
          _ref2 = self.form.elements;
          _results = [];
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            element = _ref2[_j];
            if (!element.classList.contains('exclude')) {
              _results.push(element);
            }
          }
          return _results;
        })();
        reason = document.getElementsByName('partial_reason')[0];
        if (reason) {
          form_elements.push(reason);
        }
        details = event.detail;
        self.submit_observation(self, form_elements, details.action, self.form.getAttribute('ajax-args'));
        dialog_id = document.getElementById(details.target);
        cover = document.getElementById('cover');
        dialog_id.parentNode.removeChild(cover);
        return dialog_id.parentNode.removeChild(dialog_id);
      });
      this.patient_name_el.addEventListener('click', function(event) {
        var patient_id;
        event.preventDefault();
        patient_id = event.srcElement.getAttribute('patient-id');
        if (patient_id) {
          return self.get_patient_info(patient_id, self);
        } else {
          return new window.NH.NHModal('patient_info_error', 'Error getting patient information', '', ['<a href="#" data-action="close" data-target="patient_info_error">Cancel</a>'], 0, document.getElementsByTagName('body')[0]);
        }
      });
    }

    NHMobileForm.prototype.validate = function(event) {
      var container_el, criteria, error_el, input, max, min, other_input, value, _ref;
      event.preventDefault();
      clearTimeout(window.form_timeout);
      window.form_timeout = setTimeout(this.timeout_func, this.form_timeout);
      input = event.srcElement;
      container_el = input.parentNode.parentNode;
      error_el = container_el.getElementsByClassName('input-body')[0].getElementsByClassName('errors')[0];
      if (input.type === 'number') {
        value = parseFloat(input.value);
        min = parseFloat(input.min);
        max = parseFloat(input.max);
        container_el.classList.remove('error');
        input.classList.remove('error');
        error_el.innerHTML = '';
        if (input.step === '1' && value % 1 !== 0) {
          container_el.classList.add('error');
          input.classList.add('error');
          error_el.innerHTML = '<label for="' + input.name + '" class="error">Must be whole number</label>';
          return;
        }
        if (value < min) {
          container_el.classList.add('error');
          input.classList.add('error');
          error_el.innerHTML = '<label for="' + input.name + '" class="error">Input too low</label>';
          return;
        }
        if (value > max) {
          container_el.classList.add('error');
          input.classList.add('error');
          error_el.innerHTML = '<label for="' + input.name + '" class="error">Input too high</label>';
          return;
        }
        if (input.getAttribute('data-validation')) {
          criteria = eval(input.getAttribute('data-validation'))[0];
          other_input = (_ref = document.getElementById(criteria[1])) != null ? _ref.value : void 0;
          if (other_input && !eval(value + ' ' + criteria[0] + ' ' + other_input)) {
            container_el.classList.add('error');
            input.classList.add('error');
            error_el.innerHTML = '<label for="' + input.name + '" class="error">Input must be ' + criteria[0] + ' ' + criteria[1] + '</label>';
          }
        }
      } else {

      }
    };

    NHMobileForm.prototype.trigger_actions = function(event) {
      var actions, el, field, inp, input, value, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _results;
      event.preventDefault();
      clearTimeout(window.form_timeout);
      window.form_timeout = setTimeout(this.timeout_func, this.form_timeout);
      input = event.srcElement;
      value = input.value;
      if (value === '') {
        value = 'Default';
      }
      if (input.getAttribute('data-onchange')) {
        actions = eval(input.getAttribute('data-onchange'))[0];
        _ref1 = (_ref = actions[value]) != null ? _ref['hide'] : void 0;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          field = _ref1[_i];
          el = document.getElementById('parent_' + field);
          el.style.display = 'none';
          inp = document.getElementById(field);
          inp.classList.add('exclude');
          console.log('hiding');
        }
        _ref3 = (_ref2 = actions[value]) != null ? _ref2['show'] : void 0;
        _results = [];
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          field = _ref3[_j];
          el = document.getElementById('parent_' + field);
          el.style.display = 'block';
          inp = document.getElementById(field);
          inp.classList.remove('exclude');
          _results.push(console.log('showing'));
        }
        return _results;
      }
    };

    NHMobileForm.prototype.submit = function(event) {
      var element, form_elements, valid_form;
      event.preventDefault();
      clearTimeout(window.form_timeout);
      window.form_timeout = setTimeout(this.timeout_func, this.form_timeout);
      form_elements = (function() {
        var _i, _len, _ref, _results;
        _ref = this.form.elements;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          if (!element.classList.contains('exclude')) {
            _results.push(element);
          }
        }
        return _results;
      }).call(this);
      valid_form = function() {
        var _i, _len;
        for (_i = 0, _len = form_elements.length; _i < _len; _i++) {
          element = form_elements[_i];
          if (element.classList.contains('error') || !element.value) {
            return false;
          }
        }
        return true;
      };
      if (valid_form()) {
        this.submit_observation(this, form_elements, this.form.getAttribute('ajax-action'), this.form.getAttribute('ajax-args'));
        return console.log('submit');
      } else {
        return this.display_partial_reasons(this);
      }
    };

    NHMobileForm.prototype.display_partial_reasons = function(self) {
      return Promise.when(this.call_resource(this.urls.json_partial_reasons())).then(function(data) {
        var option, option_name, option_val, options, select, _i, _len, _ref;
        options = '';
        _ref = data[0][0];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          option = _ref[_i];
          option_val = option[0];
          option_name = option[1];
          options += '<option value="' + option_val + '">' + option_name + '</option>';
        }
        select = '<select name="partial_reason">' + options + '</select>';
        return new window.NH.NHModal('partial_reasons', 'Submit partial observation', '<p class="block">Please state reason for submitting partial observation</p>' + select, ['<a href="#" data-action="close" data-target="partial_reasons">Cancel</a>', '<a href="#" data-target="partial_reasons" data-action="partial_submit" data-ajax-action="json_task_form_action">Confirm</a>'], 0, self.form);
      });
    };

    NHMobileForm.prototype.submit_observation = function(self, elements, endpoint, args) {
      var el, serialised_string, url;
      serialised_string = ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          el = elements[_i];
          _results.push(el.name + '=' + el.value);
        }
        return _results;
      })()).join("&");
      url = this.urls[endpoint].apply(this, args.split(','));
      return Promise.when(this.call_resource(url, serialised_string)).then(function(server_data) {
        var buttons, data, task, task_list, tasks, title, triggered_tasks, _i, _len, _ref;
        data = server_data[0][0];
        if (data.status === 3) {
          new window.NH.NHModal('submit_observation', data.modal_vals['title'] + ' for ' + self.patient_name() + '?', data.modal_vals['content'], ['<a href="#" data-action="close" data-target="submit_observation">Cancel</a>', '<a href="#" data-target="submit_observation" data-action="submit" data-ajax-action="' + data.modal_vals['next_action'] + '">Submit</a>'], 0, self.form);
          return document.getElementById('submit_observation').classList.add('clinicalrisk-' + data.score['clinical_risk'].toLowerCase());
        } else if (data.status === 1) {
          triggered_tasks = '';
          buttons = ['<a href="' + self.urls['task_list']().url + '" data-action="confirm">Go to My Tasks</a>'];
          if (data.related_tasks.length === 1) {
            triggered_tasks = '<p>' + data.related_tasks[0].summary + '</p>';
            buttons.push('<a href="' + self.urls['single_task'](data.related_tasks[0].id).url + '">Confirm</a>');
          } else if (data.related_tasks.length > 1) {
            tasks = '';
            _ref = data.related_tasks;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              task = _ref[_i];
              tasks += '<li><a href="' + self.urls['single_task'](task.id).url + '">' + task.summary + '</a></li>';
            }
            triggered_tasks = '<ul class="menu">' + tasks + '</ul>';
          }
          task_list = triggered_tasks ? triggered_tasks : '<p>Observation was submitted</p>';
          title = triggered_tasks ? 'Action required' : 'Observation successfully submitted';
          return new window.NH.NHModal('submit_success', title, task_list, buttons, 0, self.form);
        } else if (data.status === 4) {
          return new window.NH.NHModal('cancel_success', 'Task successfully cancelled', '', ['<a href="' + self.urls['task_list']().url + '" data-action="confirm" data-target="cancel_success">Go to My Tasks</a>'], 0, self.form);
        } else {
          return new window.NH.NHModal('submit_error', 'Error submitting observation', data.error, ['<a href="#" data-action="close" data-target="submit_error">Cancel</a>'], 0, self.form);
        }
      });
    };

    NHMobileForm.prototype.handle_timeout = function(self, id) {
      return Promise.when(self.call_resource(self.urls['json_cancel_take_task'](id))).then(function(server_data) {
        return new window.NH.NHModal('form_timeout', 'Task window expired', '<p class="block">Please pick the task again from the task list if you wish to complete it</p>', ['<a href="' + self.urls['task_list']().url + '" data-action="confirm">Go to My Tasks</a>'], 0, document.getElementsByTagName('body')[0]);
      });
    };

    NHMobileForm.prototype.cancel_notification = function(self) {
      return Promise.when(this.call_resource(this.urls.ajax_task_cancellation_options())).then(function(data) {
        var option, option_name, option_val, options, select, _i, _len, _ref;
        options = '';
        _ref = data[0][0];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          option = _ref[_i];
          option_val = option.id;
          option_name = option.name;
          options += '<option value="' + option_val + '">' + option_name + '</option>';
        }
        select = '<select name="reason">' + options + '</select>';
        return new window.NH.NHModal('cancel_reasons', 'Cancel task', '<p>Please state reason for cancelling task</p>' + select, ['<a href="#" data-action="close" data-target="cancel_reasons">Cancel</a>', '<a href="#" data-target="cancel_reasons" data-action="partial_submit" data-ajax-action="cancel_clinical_notification">Confirm</a>'], 0, document.getElementsByTagName('form')[0]);
      });
    };

    return NHMobileForm;

  })(NHMobile);

  if (!window.NH) {
    window.NH = {};
  }

  if (typeof window !== "undefined" && window !== null) {
    window.NH.NHMobileForm = NHMobileForm;
  }

  NHModal = (function() {
    function NHModal(id, title, content, options, popupTime, el) {
      var cover, dialog, self;
      this.id = id;
      this.title = title;
      this.content = content;
      this.options = options;
      this.popupTime = popupTime;
      this.el = el;
      this.handle_button_events = __bind(this.handle_button_events, this);
      this.calculate_dimensions = __bind(this.calculate_dimensions, this);
      this.create_dialog = __bind(this.create_dialog, this);
      self = this;
      dialog = this.create_dialog(self, this.id, this.title, this.content, this.options);
      cover = document.createElement('div');
      cover.setAttribute('class', 'cover');
      cover.setAttribute('id', 'cover');
      cover.setAttribute('data-action', 'close');
      cover.setAttribute('data-target', this.id);
      cover.style.height = (el.clientHeight * 1.5) + 'px';
      cover.addEventListener('click', self.handle_button_events);
      this.el.appendChild(cover);
      this.el.appendChild(dialog);
      this.calculate_dimensions(dialog, dialog.getElementsByClassName('dialogContent')[0], this.el);
    }

    NHModal.prototype.create_dialog = function(self, popup_id, popup_title, popup_content, popup_options) {
      var container, content, dialog_content, dialog_div, dialog_header, dialog_options, header, options;
      dialog_div = function(id) {
        var div;
        div = document.createElement('div');
        div.setAttribute('class', 'dialog');
        div.setAttribute('id', id);
        return div;
      };
      dialog_header = function(title) {
        var header;
        header = document.createElement('h2');
        header.innerHTML = title;
        return header;
      };
      dialog_content = function(message) {
        var content;
        content = document.createElement('div');
        content.setAttribute('class', 'dialogContent');
        content.innerHTML = message;
        return content;
      };
      dialog_options = function(self, buttons) {
        var button, option_list, _fn, _i, _len;
        option_list = document.createElement('ul');
        switch (buttons.length) {
          case 1:
            option_list.setAttribute('class', 'options one-col');
            break;
          case 2:
            option_list.setAttribute('class', 'options two-col');
            break;
          case 3:
            option_list.setAttribute('class', 'options three-col');
            break;
          case 4:
            option_list.setAttribute('class', 'options four-col');
            break;
          default:
            option_list.setAttribute('class', 'options one-col');
        }
        _fn = function(self) {
          var option_button, _ref;
          option_button = document.createElement('li');
          option_button.innerHTML = button;
          if ((_ref = option_button.getElementsByTagName('a')) != null) {
            _ref[0].addEventListener('click', self.handle_button_events);
          }
          return option_list.appendChild(option_button);
        };
        for (_i = 0, _len = buttons.length; _i < _len; _i++) {
          button = buttons[_i];
          _fn(self);
        }
        return option_list;
      };
      container = dialog_div(popup_id);
      header = dialog_header(popup_title);
      content = dialog_content(popup_content);
      options = dialog_options(self, popup_options);
      container.appendChild(header);
      container.appendChild(content);
      container.appendChild(options);
      return container;
    };

    NHModal.prototype.calculate_dimensions = function(dialog, dialog_content, el) {
      var available_space, margins, max_height, top_offset;
      margins = 80;
      available_space = function(dialog, el) {
        var dialog_header_height, dialog_options_height, el_height, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        dialog_header_height = (_ref = dialog.getElementsByTagName('h2')) != null ? (_ref1 = _ref[0]) != null ? _ref1.clientHeight : void 0 : void 0;
        dialog_options_height = (_ref2 = dialog.getElementsByClassName('options')) != null ? (_ref3 = _ref2[0]) != null ? (_ref4 = _ref3.getElementsByTagName('li')) != null ? (_ref5 = _ref4[0]) != null ? _ref5.clientHeight : void 0 : void 0 : void 0 : void 0;
        el_height = el.clientHeight;
        return el_height - ((dialog_header_height + dialog_options_height) + (margins * 2));
      };
      max_height = available_space(dialog, el);
      top_offset = el.offsetTop + margins;
      dialog.style.top = top_offset + 'px';
      dialog.style.display = 'inline-block';
      if (max_height) {
        dialog_content.style.maxHeight = max_height + 'px';
      }
    };

    NHModal.prototype.handle_button_events = function(event) {
      var cover, dialog_id, submit_event;
      switch (event.srcElement.getAttribute('data-action')) {
        case 'close':
          event.preventDefault();
          dialog_id = document.getElementById(event.srcElement.getAttribute('data-target'));
          cover = document.getElementById('cover');
          dialog_id.parentNode.removeChild(cover);
          return dialog_id.parentNode.removeChild(dialog_id);
        case 'submit':
          event.preventDefault();
          submit_event = new CustomEvent('post_score_submit', {
            'detail': event.srcElement.getAttribute('data-ajax-action')
          });
          document.dispatchEvent(submit_event);
          dialog_id = document.getElementById(event.srcElement.getAttribute('data-target'));
          cover = document.getElementById('cover');
          dialog_id.parentNode.removeChild(cover);
          return dialog_id.parentNode.removeChild(dialog_id);
        case 'partial_submit':
          event.preventDefault();
          submit_event = new CustomEvent('partial_submit', {
            'detail': {
              'action': event.srcElement.getAttribute('data-ajax-action'),
              'target': event.srcElement.getAttribute('data-target')
            }
          });
          return document.dispatchEvent(submit_event);
      }
    };

    return NHModal;

  })();

  if (!window.NH) {
    window.NH = {};
  }

  if (typeof window !== "undefined" && window !== null) {
    window.NH.NHModal = NHModal;
  }

}).call(this);
