import Extension from '@windowsworldcartoon/codeinspector-extension-handler';

class MyJsExtension extends Extension {
  activate() {
    console.log(`${this.name} activated`);
    
    // Register a command
    this.registerCommand('my-js.action', () => {
      this.showNotification('Action executed!', 'info');
      return { status: 'success' };
    });

    this.registerCommand('my-js.action2', () => {
      this.showNotification('Action 2 executed!', 'info');
      return { status: 'success' };
    });
    
    // Register a menu item
    this.registerMenu({
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

    // Register a command menu item (appears in command palette)
    this.registerCommandMenu({
      id: 'my-js.command-palette-action',
      name: 'my-js: Execute Action',
      action: 'executeExtensionCommand',
      extensionId: this.id,
      command: 'action',
      description: 'Execute action from my-js',
      shortcut: 'Ctrl+Shift+M'
    });
    this.registerCommandMenu({
      id: 'my-js.command-palette-action-2',
      name: 'my-js: Execute Action 2',
      action: 'executeExtensionCommand',
      extensionId: this.id,
      command: 'action2',
      description: 'Execute action 2 from my-js',
      shortcut: 'Ctrl+Shift+N'
    });
  }

  deactivate() {
    console.log(`${this.name} deactivated`);
  }

  action() {
    this.showNotification('my-js', 'Command palette action executed!', 'info');
    return { status: 'success' };
  }
  action2() {
    this.showProgress('my-js', 'Executing action 2...', 'info');
    return { status: 'success' };
  }
}

export default MyJsExtension;
