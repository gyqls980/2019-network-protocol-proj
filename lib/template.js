
module.exports = {
  main_body:function(){ //main 페이지 html 구현
    var list = `
      <p><a href="/" style="text-decoration:none;"><h1 style="font-size:50px; text-align:center;">Hyobin's Diary</h1></a></p>
                
          <ul style=" list-style: none; margin:auto; width:800px; ">
            <li style="float:left;"><a href="/travel" style="background-color: #F5A9D0;float:left;text-decoration: none; 
                text-align:center;color: black; display: inline-block; width: 150px; font-size: 15px; " >My Travel Diary</a></li>
            <li style="float:left;"><a href="/todolist" style=" background-color: #F5A9D0;float:left;text-decoration:none; 
                text-align:center;color: black; display: inline-block; width: 150px; font-size: 15px; " >My To-Do List</a></li>
            <li style="float:left;"><a href="/bucketlist" style="background-color: #F5A9D0;float:left;text-decoration: none; 
                text-align:center;color: black; display: inline-block; width: 150px; font-size: 15px; ">My BucketList</a></li>
            <li style="float:left;"><a href="/visitors" style="background-color: #F5A9D0;float:left;text-decoration: none; 
                text-align:center;color: black; display: inline-block; width: 150px; font-size: 15px; ">My Visitors</a></li>
            <li style="float:left;"><a href="/aboutme" style="background-color: #F5A9D0;float:left;text-decoration: none; 
                text-align:center;color: black; display: inline-block; width: 150px; font-size: 15px; ">About Me</a></li>
         </ul>
        <br/><br/>
      <div style="">
        <img src="/mainimage.JPG" style="display: block; margin: auto; width:500px; height:500px;  ">
        <p style="text-align:right; margin-right : 30px;">By 소프트웨어학부 20171726 황효빈</p>
      </div>
      
    `;
    return list;
  },travel_list:function(topics){ //travel diary 페이지 html 구현
    var list = `<p style="float:left;"><h1 style="font-size:30px;"><a href="/travel" 
                  style="text-decoration: none; ">My Travel Diary</a></h1></p>`;
    list += `<div style="float:left; width:250px;border:2px solid #F5A9D0; margin-right : 20px;"><ul>`;
    var i = 0;
    while(i < topics.length){
      list = list + `
                      <li style="float:left; margin-right:10px;"><a href="/travel/${topics[i].id}" 
                            style="text-decoration:none;">${topics[i].place}</a></li>
                      
                      <form style="float:left;" action="delete_travellist" method="post">
                          <input type="hidden" name="id" value="${topics[i].id}">
                          <input type="submit" value="delete">
                      </form>
                      <br/><br/>
                    `;
      i = i + 1;
    }
    list = list+'</ul></div>';
    list += `
      <div style="float:left;">
      <form action="/create_diary" method="post">
      <p><h4>새로운 여행 다이어리 추가하기</h4></p>
      <p>
        <input style="width:600px;" type="text" name="travel_date" placeholder="날짜(ex_YYYY-MM-DD)">
      
      </p>
      <p><input style="width:60px;" type="text" name="place" placeholder="장소">
      
      </p>
      <p>
        <textarea style="width:600px;" name="diary" placeholder="내용"></textarea>
      </p>
      <p>
        <input type="submit" onclick="alert('저장되었습니다!')">
        <a href="/"><input type="button" name="home" value="home"></a>
      </p>
    </form>
    </div>
    `;
    return list;
  }, 
 
  todo_list:function(topics){ //todo list 페이지 html 구현
    var list = '<p><h1 style="font-size:30px;"><a href="/todolist" style="text-decoration:none;">My To-Do List</a></h1></p>';
    list += `<div style="float:left; border:2px solid #F5A9D0; padding-right : 20px; margin-right : 20px;"><ul>`;
    var i = 0;
    while(i < topics.length){
      list = list + `<li>${topics[i].todo} -> ${topics[i].until} 까지</li>
                      <form action="delete_todolist" method="post">
                          <input type="hidden" name="id" value="${topics[i].id}">
                          <input type="submit" value="delete">
                      </form>
                    <br/>    
                      `;
      i = i + 1;
     
    }
    list = list+'</ul></div>'
    list = list + `
    
          <form action="/create_todolist" method="post">
            <p><h4>ToDo 리스트 추가</h4></p>
            <p>
              <textarea style="width:600px;" name="todo" placeholder="What To Do?"></textarea>
            </p>
            <p>
              <input style="width:600px;" type="text" name="until" placeholder="Deadline(ex_YYYY-MM-DD)"></textarea>
            </p>
            <p>
              <input type="submit" onclick="alert('저장되었습니다!')">
              <a href="/"><input type="button" name="home" value="home"></a>
            </p>
          </form>
        
          `;           

    return list;
  },bucket_list:function(topics){  //bucket list 페이지 html 구현
    var list = `
      <p><h1 style="font-size:30px;"><a href="/bucketlist" style="text-decoration:none;">My BucketList</a></h1></p>
    
    `;
    list += '<div style="width:180px;border:2px solid #F5A9D0;  margin-right:20px; padding-bottom:5px; float:left;"><ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li style="float:left; width:60px;"><a href="/bucketlist/${topics[i].year}" 
                          style="text-decoration:none;">${topics[i].year}</a></li>
                      
                      <form style="float:left" action="/delete_bucketlist" method="post">
                          <input type="hidden" name="year" value="${topics[i].year}">
                          <input type="submit" value="delete">
                      </form>

                    <br/><br/>
                                   
                    `;
      i = i + 1;
    }
    list = list+'</ul></div>'

    return list;
  },bucket_create:function(){ //bucket list 삽입 기능 form
    var list =  `    
                      <form action="/create_bucketlist" method="post">
                              
                      <p><h4>Do Insert</h4></p>
                      <p>
                        <input style="width:600px;" type="text" name="year" placeholder="year(ex_YYYY)">
                      </p>
                      <p>
                        <textarea style="width:600px;" name="list" placeholder="bucketlist"></textarea>
                      </p>
                      <p>
                        <input type="submit" onclick="alert('저장되었습니다!')">
                        <a href="/"><input type="button" name="home" value="home"></a>
                      </p>
                    </form>

                    
                  ` ;

    return list;
  }, bucket_update:function(topics){ //bucket list 수정 기능 form
    var list =  `
                      <form action="/update_bucketlist" method="post">

                      <p><h4>Do Update</h4></p>
                      <p>
                        <input style="width:600px;" type="text" name="year" placeholder="year" value="${topics[0].year}">
                      </p>
                      <p>
                        <textarea style="width:600px;" name="list" placeholder="bucketlist" >${topics[0].list}</textarea>
                      </p>
                      <p>
                        <input type="submit" onclick="alert('수정되었습니다!')">
                        <a href="/"><input type="button" name="home" value="home"></a>
                      </p>
                    </form>
                    
                  ` ;

    return list;
  }
  ,visitors_list:function(topics){ //방명록 페이지 html 구현
    var list = `
        <p style="float:left;"><h1 style="font-size:30px;"><a href="/visitors" style="text-decoration:none;">My Visitors</a></h1></p> 
    `;
    list += `<table border="1" width=60%a><th>Name</th><th>Comment</th><th>Date</th><th>Delete</th>`;
    var i = 0;  
    while(i < topics.length){
            list+= `<tr>`;
            list+= `<td>${topics[i].name}</td><td>${topics[i].comment}</td><td>${topics[i].date}</td>
                      <td>
                      <form action="delete_visitorslist" method="post">
                          <input type="hidden" name="id" value="${topics[i].id}">
                          <input type="submit" value="delete">
                      </form>
                      </td>
            `;
            list = list + `</tr>`
            i = i + 1;
        }
        list = list+'</table>';
    list = list + `
    
          <form action="/create_visitorslist" method="post">
            <p><h4>방명록 작성</h4></p>
            <p>
              <b>이름</b><br/><input style="width:600px;" name="name" placeholder="이름을 입력해주세요.">
            </p>
            <p>
              <b>방명록</b><br/><textarea style="width:600px;" name="comment" placeholder="방명록을 작성해주세요."></textarea>
            </p>
            <p>
              <b>날짜</b><br/><input style="width:600px;" type="text" name="date" placeholder="날짜를 입력해주세요.(ex_YYYY-MM-DD)">
            </p>
            <p>
              <input type="submit" onclick="alert('저장되었습니다!')">
              <a href="/"><input type="button" name="home" value="home"></a>
            </p>
          </form>
        
          `;           

    return list;

}, aboutme_list:function(topics){ //자기소개 페이지 html 구현
  var list = `<div align="center" style="margin-left : auto; margin-right : auto; margin-top : 20px;width:500px; 
                border:2px solid #F5A9D0; padding-bottom : 20px; paddig-left : 20px; padding-right:20px;">
        <p ><h1 style="font-size:30px; "><a href="/aboutme" style="text-decoration:none;">About Me</a></h1></p>

    `;
    list+= `
        <p style="text-align:center;"><b>이름 : </b>${topics[0].name}</p>
        <p style="text-align:center;"><b>생년월일 :  </b>${topics[0].birth}</p>
        <p style="text-align:center;"><b>학교 : </b>${topics[0].school}</p>
        <p style="text-align:center;"><b>학부 : </b>${topics[0].department}</p>
        <p style="text-align:center;"><b>핸드폰번호 : </b>${topics[0].phone}</p>
      <p>
      <a href="/" style="margin:auto;text-align:center;"><input type="button" name="home" value="home"></a></p></div>

    `;

    return(list);
}
}


