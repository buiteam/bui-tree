var $ = require('jquery'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  Tree = require('../index'),
  TreeList = Tree.TreeList;

$('<div class="row"><div class="span8" id="t9"></div></div>').prependTo('body');

describe('高级勾选',function () {
  var nodes = [
      {text : '1',id : '1',leaf : false,children : [{text : '11',id : '11'},{text : '12',id : '12',children:[{text : '121',id : '121',checked:false},{text : '122',id : '122',checked:false}]}]},
      {text : '2',id : '2',expanded : true,children : [
          {text : '21',id : '21',children : [{text : '211',id : '211',checked : true},{text : '212',id : '212',checked : false}]},
          {text : '22',id : '22',checked : false}
      ]},
      {text : '3',id : '3',checked : false,children : [{id : '31',text : '31'},{id : '32',text : '32',checked:false}]},
      {text : '4',id : '4'},
      {text : '5',id : '5'},
      {text : '6',id : '6'},
      {text : '7',id : '7'}
    ];
  var tree = new TreeList({
    render : '#t9',
    showLine : true,
    multipleCheck : false,
    checkType : 'all',
    nodes : nodes
  });
  tree.render();

  describe('测试初始化',function(){
    it('测试初始勾选',function(){
      var node = tree.findNode('211');
      expect(tree.isChecked(node)).to.be(true);
      
    });

    it('测试级联勾选',function(){
      var node = tree.findNode('21');
      expect(tree.isChecked(node)).to.be(true);
      expect(tree.isChecked(node.parent)).to.be(true);
    });
  });

  describe('修改勾选',function(){

    it('勾选兄弟节点',function(){
      var node = tree.findNode('212');
      tree.setNodeChecked(node,true);

      expect(tree.isChecked(node)).to.be(true);
      expect(tree.isChecked(node.parent)).to.be(true);

      node = tree.findNode('211');
      expect(tree.isChecked(node)).to.be(false);

    });

    it('勾选叶子节点',function(){
      var node = tree.findNode('32');
      tree.setNodeChecked(node,true);
      expect(tree.isChecked(node)).to.be(true);
      expect(tree.isChecked(node.parent)).to.be(true);

      node = tree.findNode('212');
      expect(tree.isChecked(node)).to.be(false);
      expect(tree.isChecked(node.parent)).to.be(false);
      expect(tree.isChecked(node.parent.parent)).to.be(false);/**/
    });

    it('勾选非叶子节点',function(){
      var node = tree.findNode('1');
      tree.setNodeChecked(node,true);
      expect(tree.isChecked(node)).to.be(true);
      expect(tree.isChecked(node.children[0])).to.be(true);
      expect(tree.isChecked(node.children[1])).to.be(false);

      var node = tree.findNode('32');
      expect(tree.isChecked(node)).to.be(false);
      expect(tree.isChecked(node.parent)).to.be(false);

    });

    it('勾选最外层节点',function(){
      var node = tree.findNode('4');
      tree.setNodeChecked(node,true);
      expect(tree.isChecked(node)).to.be(true);

      var node = tree.findNode('1');
      expect(tree.isChecked(node)).to.be(false);
      expect(tree.isChecked(node.children[0])).to.be(false);
      expect(tree.isChecked(node.children[1])).to.be(false);
    });/**/
  });

});


describe('非级联勾选',function () {
  var nodes = [
      {text : '1',id : '1',leaf : false,children : [{text : '11',id : '11'},{text : '12',id : '12',children:[{text : '121',id : '121',checked:false},{text : '122',id : '122',checked:false}]}]},
      {text : '2',id : '2',expanded : true,children : [
          {text : '21',id : '21',children : [{text : '211',id : '211',checked : true},{text : '212',id : '212',checked : false}]},
          {text : '22',id : '22',checked : false}
      ]},
      {text : '3',id : '3',checked : false,children : [{id : '31',text : '31'},{id : '32',text : '32',checked:false}]},
      {text : '4',id : '4'},
      {text : '5',id : '5'},
      {text : '6',id : '6'},
      {text : '7',id : '7'}
    ];
  var tree = new TreeList({
    render : '#t9',
    showLine : true,
    multipleCheck : false,
    cascadeCheckd : false,
    checkType : 'all',
    nodes : nodes
  });
  tree.render();

  describe('测试初始化',function(){
    it('测试初始勾选',function(){
      var node = tree.findNode('211');
      expect(tree.isChecked(node)).to.be(true);
      
    });

    it('测试级联勾选',function(){
      var node = tree.findNode('21');
      expect(tree.isChecked(node)).to.be(false);
      expect(tree.isChecked(node.parent)).to.be(false);
    });
  });
});