<template>
<<<<<<< HEAD
  <b-jumbotron header="Fantastic jobs" lead="As an employee at Gröna Lund, you have one of the main roles in a magical performance. The park is your scene, guests your expectant audience and together with your colleagues you are creating unforgettable experiences and fabulous memories for over 1.5
    million children and adults every year. Now we are looking for new stars for the 2019 season and we are looking for you who thrive in the spotlight, passionate about the guest meeting and always want to exceed our guests' expectations.">
    <p>Start your application now!</p>
    <b-btn size="lg" variant="info" to="/apply">APPLY NOW!</b-btn>
  </b-jumbotron>
</template>

<script>
  export default {
    name: 'DashboardView'
  }
=======
  <main>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sunt quod consectetur amet ipsa, quaerat maxime impedit repellendus dolorum dolor porro perferendis? Repellat expedita tenetur nisi, similique ipsum error quas!
    Quidem quo consectetur eaque commodi voluptas aspernatur sapiente ab modi voluptatum veritatis, ullam nulla ea laborum itaque quod vitae recusandae nisi corporis laboriosam optio libero amet? Architecto necessitatibus nisi voluptatem.
    Voluptate cumque, aliquam dolore dolorem, obcaecati reprehenderit magnam optio sunt nobis quae quod voluptatum necessitatibus tenetur voluptates. Incidunt cupiditate atque maiores maxime ex minima iusto enim! Neque cumque vitae nam?
    Recusandae unde eum fugiat odit tenetur similique nam praesentium iure commodi, error placeat deleniti veritatis corporis ratione sint officiis eaque at quaerat harum perferendis tempora vitae dicta cupiditate rem. Nesciunt.
    Laboriosam aspernatur dolores maxime iste ipsam et ea voluptate aliquam voluptatibus veritatis quod animi harum rem, deserunt expedita sed consequatur culpa quisquam quos suscipit maiores doloremque sapiente, dolorem dolor! Aliquid.
    Modi, autem! Possimus iste tenetur quas perspiciatis officiis voluptatem maxime, ab explicabo ad impedit accusantium necessitatibus soluta repudiandae. Architecto, facere rerum odit amet repellat repellendus nobis aperiam aut minus atque!
    Odio, debitis a deserunt fuga eius voluptatem dolorem ducimus nostrum ut, deleniti porro! Sequi debitis quidem sed odio laborum commodi deserunt. Iure animi fuga, reiciendis aliquam atque corporis qui repellendus.
    Assumenda ut eum dolores obcaecati iure dignissimos eligendi cumque, consequuntur, autem odit minus neque explicabo porro, tempore illo quisquam. Nisi ducimus ipsa nobis! Cum animi eum obcaecati ipsam? Eligendi, ullam?
    Vero ad eligendi modi laudantium ipsum dolorem temporibus fuga aut asperiores aliquam ex, possimus architecto sint, similique assumenda excepturi libero eaque aperiam dolor officia debitis adipisci magnam a? Harum, enim?
    Sint ducimus aliquid molestias eius provident possimus officia at unde in consectetur porro doloribus rem omnis explicabo quis dicta vel, nostrum iusto minus eaque suscipit! Magni quod eaque quos nesciunt?
    Placeat consectetur incidunt iusto illo eum corrupti ad quaerat ab rerum exercitationem ea consequatur debitis hic odit, delectus ducimus fugit optio recusandae esse asperiores excepturi molestiae? Natus porro consequuntur harum?
    Hic, deserunt incidunt vel sunt, veritatis fugiat voluptatum sit quas, eaque adipisci ipsa cupiditate tempore explicabo doloremque. Excepturi distinctio deleniti sunt eligendi. Magni eaque delectus earum totam, nobis ex vero!
    Nemo commodi beatae libero accusamus alias? Qui suscipit autem quis inventore esse impedit accusantium perferendis, iure debitis quo doloremque sunt vel voluptatum illo magnam molestias praesentium expedita nulla? Et, eveniet.
    Ad quis, dolores dignissimos laborum vitae, at veritatis illum quam facere libero iusto voluptatum deserunt nisi! Aperiam accusantium inventore, ducimus quia aliquam iusto architecto sequi voluptates ea minima delectus eum?
    Minus vero, reprehenderit repudiandae deserunt nam molestiae dolorum excepturi qui velit odio neque, placeat quae optio, atque beatae. Facilis, iure! Porro, in nostrum! Omnis ratione dignissimos nobis dolorem consectetur vitae.</p>
  </main>
</template>

<script>
import UserService from '../services/UserService';
export default {
  name: 'DashboardView',
  async created() {
    const res = await UserService.checkToken();
    // eslint-disable-next-line
    console.log(res);
    if (res.success) {
      // eslint-disable-next-line
      console.log('success');
    } else {
      // eslint-disable-next-line
      console.log('fail');
    }
  }
}
>>>>>>> started work on saving state of application in cookies
</script>
