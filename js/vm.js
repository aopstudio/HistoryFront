var vm=new Vue({
    el: '#app',
    data: {
        datas:[],
        year:0,
        newDate:'',
        newHeading:'',
        newBody:'',
        theme:''
    },
    mounted(){
      var reg = new RegExp("(^|&)"+ 'theme' +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null) 
        this.theme=unescape(r[2]); 
      axios.get('http://localhost:8080/History/GetBigThings',{
        params:{
          table:this.theme
        }
      })
      .then((response)=> {
          this.datas=response.data;
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    methods: {
    isInverted(index) {
      if(index%2===0){
        return "";
      }
      else{
        return "timeline-inverted";
      }
    },
    isHidden(data){
      if(data.date==this.year){
        return "hidden";
      }
      else{
        this.year=data.date;
        return "";
      }
    },
    newThing(){
      if(this.newDate!==''&&this.newHeading!==''&&this.newBody!==''){
        axios.get('http://localhost:8080/History/NewBigThing',{
          params:{
            date:this.newDate,
            heading:this.newHeading,
            body:this.newBody
          }
        })
        .then((response)=> {
          window.alert('添加成功');
          window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
            window.alert('添加失败');
            return;
        });
        
      }
      else{
        window.alert('输入信息不全');
      }
    },
    deleteThing(id,index){
      axios.get('http://localhost:8080/History/DeleteBigThing',{
          params:{
            id:id
          }
        })
        .then((response)=> {
          window.alert('删除成功');
          window.location.reload();
        })
        .catch(function (error) {
          window.alert('删除失败');
          console.log(error);
          return;
        });
        
    }
  },
  deleteThing(id){

  }
})