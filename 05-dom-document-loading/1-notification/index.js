export default class NotificationMessage {
    static lastShownComponent;
    
    constructor(message, props = {}) {
      const {
        duration = 0,
        type = ''  
      } = props;
      this.message = message;    
      this.duration = duration;
      this.type = type;
      this.timerId;
      this.element = this.createElement(this.createTemplate());
    }

    createElement(template) {
      const element = document.createElement('div');
      element.innerHTML = template;
      return element.firstElementChild;
    }
    
    createNotiClass() {
      return this.type === 'success' ? `${this.type} notification notification.success` : `${this.type} notification notification.error`;
    }

    createNotiHeaderClass() {
      return this.type === 'success' ? `${this.type} notification.success` : `${this.type}notification.error`;
    }

    createTemplate() {
      return (
        `<div class="${this.createNotiClass()}" style="--value:20s">
                        <div class="timer"></div>
                        <div class="inner-wrapper">
                            <div class="${this.createNotiHeaderClass()}">${this.type}</div>
                            <div class="notification-body">
                                ${this.message}
                            </div>
                        </div>
                </div>`
      );
    }

    show(container = document.body) {
      if (NotificationMessage.lastShownComponent) {
        NotificationMessage.lastShownComponent.hide();
      }
      NotificationMessage.lastShownComponent = this;
      this.timerId = setTimeout(() => {
        this.hide();
      }, this.duration);            
      container.append(this.element);
    }
    
    hide() {
      this.remove();
    }
    
    remove() {
      this.element.remove();
    }
    
    destroy() {
      this.element.remove();
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
    }
}
