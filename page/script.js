const extensionList = document.getElementById('nau-extensions');
const extensionTemp = document.getElementById('nau-extension-temp');

chrome.management.getAll(extensions=>{
	for(let i=0;i<extensions.length;i++){
		const extension = extensions[i];
		const extensionElm = document.importNode(extensionTemp.content, true);
		const mainElm = extensionElm.firstElementChild;
		extensionElm.getElementById('nau-extension-name').textContent = extension.name;
		const enableButton = extensionElm.getElementById('nau-extension-enable');
		enableButton.textContent = extension.enabled ? 'Disable' : 'Enable';
		let extensionState = extension.enabled;
		enableButton.addEventListener('click',async ()=>{
			try{
				extensionState = !extensionState;
				await chrome.management.setEnabled(extension.id, extensionState);
				enableButton.textContent = extensionState ? 'Disable' : 'Enable';
			}catch(e){
				alert('Sorry, Avalon couldn\'t '+enableButton.textContent+' '+extension.name+'.\n\n'+e);
			}
		});
		extensionElm.getElementById('nau-extension-uninstall').addEventListener('click',async ()=>{
			try{
				await chrome.management.uninstall(extension.id);
				mainElm.remove();
			}catch(e){
				alert('Sorry, Avalon couldn\'t uninstall '+extension.name+'.\n\n'+e);
			}
		});
		extensionList.appendChild(extensionElm);
	}
});