filmApp.controller('PanelController', function(){
 vm = this;
  vm.tab = 1;
  vm.selectTab = function(setTab){
    vm.tab = setTab;
  }
  vm.isSelected = function(checkTab){
    return vm.tab === checkTab;
  }
});//.Page Controller