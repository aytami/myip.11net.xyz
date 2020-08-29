//INITIALIZE SPEEDTEST
var s=new Speedtest(); //create speedtest object
s.onupdate=function(data){ //callback to update data in UI
    I("ip").textContent=data.clientIp;
    I("dlText").textContent=(data.testState==1&&data.dlStatus==0)?"...":data.dlStatus;
    I("ulText").textContent=(data.testState==3&&data.ulStatus==0)?"...":data.ulStatus;
    I("pingText").textContent=data.pingStatus;
    I("jitText").textContent=data.jitterStatus;
    var prog=(Number(data.dlProgress)*2+Number(data.ulProgress)*2+Number(data.pingProgress))/5;
    I("progress").style.width=(100*prog)+"%";
}
s.onend=function(aborted){ //callback for test ended/aborted
    I("startStopBtn").className=""; //show start button again
    if(aborted){ //if the test was aborted, clear the UI and prepare for new test
        initUI();
    }
}
function startStop(){ //start/stop button pressed
    if(s.getState()==3){
        //speedtest is running, abort
        s.abort();
    }else{
        //test is not running, begin
        s.start();
        I("startStopBtn").className="running";
    }
}
//function to (re)initialize UI
function initUI(){
    I("dlText").textContent="";
    I("ulText").textContent="";
    I("pingText").textContent="";
    I("jitText").textContent="";
    I("ip").textContent="";
}
function I(id){return document.getElementById(id);}
