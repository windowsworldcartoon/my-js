import Extension from '@windowsworldcartoon/codeinspector-extension-handler';

class MyJsExtension extends Extension {
  constructor({ api, config, extensionPath }) {
    super({ api, config, extensionPath });
    this.name = 'my-js';
  }

  activate() {
    console.log(`${this.name} activated`);
    
    // Register a command
    this.api.registerCommand('my-js.action', () => {
      this.api.showNotification('Action executed!', 'success');
      return { status: 'success' };
    });

    this.api.registerCommand('my-js.action2', () => {
      this.api.showNotification('Action 2 executed!', 'success');
      return { status: 'success' };
    });
    
    // Register a menu item
    this.api.registerMenu({
      id: 'my-js-menu',
      label: 'my-js',
      submenu: [
        {
          id: 'my-js.action',
          label: 'Execute Action',
          command: 'my-js.action'
        },
        {
          id: 'my-js.action-2',
          label: 'Execute Action 2',
          command: 'my-js.action2'
        }
      ]
    });

  }

  deactivate() {
    console.log(`${this.name} deactivated`);
  }
}

export default MyJsExtension;
