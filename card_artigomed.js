  Vue.component('component-card-artigomed', {
    props: ['artigomed'],
    template: `
    <div class="testimonal-textbox">
      <div class="row">
        <div class="col-sm-3" style="text-align: center;">
          <a v-bind:href="'/doctor/'+ artigomed.medic.medic_id">
            <div class="testimonal-perfil-image">
              <img class="circle" v-bind:src="artigomed.medic.image_url">
            </div>
            <span class="username">{{artigomed.medic.name_with_title}}</span></a>
            <div class="testimonal-contacts" style="margin-bottom: 15px;">
              <ul class="cardsul">
                <li class="licard">
                  <a href="">
                    <img src="/img/user-add-icon.png"></a>
                </li>
                <li class="licard">
                  <a href="">
                    <img src="/img/chat-icon.png"></a>
                </li>
                <li class="licard">
                  <a href="">
                    <img src="/img/flag-icon.png"></a>
                </li>
              </ul>
        </div>
    </div>

    <div class="col-sm-9">

      <!-- video do Youtube -->
      <div v-if="artigomed.content.youtube_video_id != null">
        <div v-if="artigomed.content.url_youtube != null">
            <iframe v-bind:src="artigomed.content.url_youtube+'?rel=0'" style="margin-left: auto;margin-right: auto;margin-bottom: 15px;width: 90%;min-height: 250px;display: block;border: 0px;"></iframe>
        </div>
        <div v-else-if="artigomed.content.youtube_video_id != null">
            <iframe v-bind:src="'https://www.youtube.com/embed/'+artigomed.content.youtube_video_id+'?rel=0'" style="margin-left: auto;margin-right: auto;margin-bottom: 15px;width: 90%;min-height: 250px;display: block;border: 0px;"></iframe>
        </div>
        <p>{{artigomed.body}}</p>
      </div>

      <div v-else>
        <img class="imgartigo" v-bind:src="artigomed.content.cover_image_url">
        <p style="text-align: justify;">{{artigomed.content.summary}}</p>
      </div>
      <!-- Fim video do youtube -->

      <div class="testimonal-actions-left">
        <ul class="cardsul">
          <li class="licard">
              <img src="/img/comment-icon.png">
              <span style="margin: 5px;">{{artigomed.comments_count}}</span> 
          </li>
          <li class="licard">
            <a style="color: #8a02c4; cursor: pointer;" v-on:click="postlike(artigomed.post_id, artigomed.likes_count)">
              <img class="likesimg" src="/img/heart-icon.png">
            </a>
            <span class="likes" style="margin: 5px;">{{artigomed.likes_count}}</span>
            <!--<span class="pstid"> {{artigomed.post_id}}</span>-->
          </li>
        </ul>
      </div>
      


      <!-- Comments -->
      <!--<div v-if="artigomed.comments_count > 0">
        <div class="testimonal-textbox" style="margin-top: 25px;" v-if="artigomed.comments_count > 0">
          <div class="row">
            <div style="width:65%; margin-right:15px;">
                <p class="comment-username">
                  {{ artigomed.comments[1].user.username }}
                </p>
              <div style="margin-left: 15px;">
                <p class="comment-text-min">{{ artigomed.comments[1].content }}</p>
              </div>
            </div>
            <p class="comment-created_at">{{ artigomed.comments[1].created_at }}  </p>
          </div>
        </div>

        <div class="testimonal-textbox" v-if="artigomed.comments_count > 1">
          <div class="row">
          <div style="width:65%; margin-right:15px;">
            <p class="comment-username">
              {{ artigomed.comments[2].user.username }}
            </p>
            <div style="margin-left: 15px;">
              <p class="comment-text-min">{{ artigomed.comments[2].content }}</p>
            </div>
          </div>
            <p class="comment-created_at">{{ artigomed.comments[2].created_at }} </p>
          </div>
        </div>
      </div>-->
      
      <!-- Comments -->

      </div>
    </div>

    <div class="testimonal-actions">
      <!-- <a class="vermais" v-bind:href="'https://newsite.aescare.com/post/content/'+ artigomed.key">Veja mais</a> -->
      <a :href="'/post/'+ artigomed.key">
        <button class="btn btn-vermais" type="button">Veja mais</button>
      </a>
    </div>

  </div>
</div>
`,
methods: {
  postlike: function (post_id, lks) {
    var formData = new FormData();
    formData.append("action", "l");
    formData.append("post_id", post_id);
    self = this;
    $.ajax({
      type: 'POST',
      url: 'https://ws.aescare.com/post/like',
      data: formData,
      crossDomain: true,
      processData: false,
      contentType: false,
      cache: false,
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {
        if (data.code != 1) {
          Toastify({
            text: data.message,
            duration: 2000,
            close: true,
            backgroundColor: "#B33A3A"
          }).showToast();
        } else {
          Toastify({
            text: "Obrigado pelo Like",
            duration: 3000,
            close: true,
            backgroundColor: "#AF44D9"
          }).showToast();
          console.log("likes count");
          var aux = 0;
          for (var i = 0; i < 50000; i++) {
          if (timeline.cardsA[i].post_id === post_id){   
          aux = i;
          document.getElementsByClassName("likes")[i-3].innerHTML = "Curtiu!";
          var heartliked = '/img/heart-icon-clicked.png';
          document.getElementsByClassName("likesimg")[i-3].src = heartliked;
          console.log("i: " + i);
          console.log(timeline.cardsA.post_id);
          console.log(post_id);
          console.log(document.getElementsByClassName("pstid")[aux].getAttribute);

          }
          else {
            
          console.log("i: " + i);
          console.log("timeline.cardsa: " + timeline.cardsA[i].post_id);
          //console.log("Likesimg: " + likesimg.length);
          console.log("timeline.cardsa: " + timeline.cardsA[i].post_id.length);
          console.log("post_id é: " + post_id);
          console.log("aux: "+aux);

          

          //if (timeline.cardsA[i].post_id.equals(post_id)) {
          //timeline.Z.push.apply(timeline.cardsPU, data.posts);
          //console.log(timeline.cardsPU);
          //timeline.pause_scroll = false;
          //timeline.$forceUpdate();
          
          //$( "#likes" ).load(window.location.href + " #likes" );
          //}
        }
        dataType: 'json';
      }
    }}});
  },}})
