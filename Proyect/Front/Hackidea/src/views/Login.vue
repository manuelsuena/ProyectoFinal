<template >
  <div>
    <!-- Se aplica el cambio de nombre-->
    <vue-headful title="Login" description="Página para loggin." />

    <!-- Menú de la página  -->
    <div class="menus">
      <MenuCustom></MenuCustom>
    </div>

    <h2>LA UNIÓN HACE LA FUERZA</h2>

    <div>
      <img src="../assets/paralogin.png" alt="Imagen de Idea" />
      <img src="../assets/backla.png" alt="Imagen de unión" />
    </div>

    <h3>
      Comparte con nosotros tus
      <strong>Ideas</strong> o
      <strong>Dudas,</strong>
      la comunidad con sus comentarios los hará llegar a la meta eficientemente.
    </h3>

    <p>Si ya estas registrado haz login, sino unete a nuestra comunidad.</p>

    <div id="botones">
      <button @click="openModal()">Login</button>
      <button @click="showRegister()">Registrarse</button>
    </div>

    <!--Elementos HTML  -->
    <div class="modal" v-show="showLogin">
      <div class="modalBox">
        <h2>Iniciar sesión</h2>
        <p v-show="required">tienes datos aun por rellenar</p>
        <label for="Email">Email:</label>
        <br />
        <input type="email" placeholder="Escribe tu email" v-model="email" />
        <label for="password">Password:</label>
        <input type="password" placeholder="Escribe tu contraseña" v-model="contrasena" />
        <br />

        <button @click="login()">Entrar</button>
      </div>
    </div>

    <br />
    <br />
    <div class="Footer">
      <FooterCustom></FooterCustom>
    </div>
  </div>
</template>

<script>
/* Importamos los componentes que queremos utilizar en esta vista */
import axios from "axios";
import MenuCustom from "@/components/MenuCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";
import Swal from "sweetalert2";
export default {
  name: "Login",
  components: {
    FooterCustom,
    MenuCustom
  },
  data() {
    return {
      email: "",
      contrasena: "",
      correctData: false,
      required: false,
      showLogin: false
    };
  },
  methods: {
    // Función de logear

    openModal() {
      this.showLogin = true;
    },
    showRegister() {
      this.$router.push("/register");
    },
    validatingData() {
      if (this.email === "" || this.contrasena === "") {
        this.correctData = false; // no enviar
        this.required = true; // se muestra mensaje
      } else {
        this.correctData = true; // si enviar
        this.required = false; // no se muestra
      }
    },
    login(email, contrasena) {
      this.validatingData(); // se valida si hay datos
      if (this.correctData) {
        const self = this;
        axios
          .post("http://localhost:3009/user/login", {
            email: self.email,
            contrasena: self.contrasena
          })
          .then(function(response) {
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("role", response.data.data.role);
            localStorage.setItem("nombres", response.data.data.nombre);
            localStorage.setItem("id", response.data.data.id);
            Swal.fire({
              icon: "success",
              title: "Login correct",
              text: "Ya puedes utilizar todas las características de la página "
            });
            self.$router.push("/");
          })
          .catch(function(error) {
            console.log(error);

            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Login incorrect"
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Faltan datos"
        });
      }
    }
  }
};
</script>

<style scoped>
input {
  padding: 0.8rem;
  margin: 1rem;
  color: #242424;
}
label {
  font-size: 1.35rem;
  display: block;
  padding: 0, 2rem;
  margin: 0, 2rem;
}
button {
  padding: 0.5rem;
  border-radius: 18%;
  background: rgb(101, 156, 219);
  color: white;
  margin: 0.5rem;
  font-size: 1rem;
}
h2 {
  margin-top: 2rem;
  color: rgb(20, 93, 177);
  margin-bottom: 4rem;
}
h3 {
  margin-top: 2rem;
  color: rgb(20, 93, 177);
  margin-bottom: 2rem;
}
#input {
  display: inline-block;
  width: 20%;
  padding: 2rem;
  color: 242424;
  background: #fffaf6;
}
.Footer {
  margin-top: 6rem;
}
/* .modal {
   margin-top: -20rem;
  position: relative;
  background-color: #fefefe;
  padding: 2rem;
  border: 1px solid #888;
   width: 70%; 
  height: 30rem; 
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 1s;
} */

.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 90%;
}
.modalBox {
  overflow-y: auto;
  background: #fefefe;
  margin: 15rem auto;
  margin-left: 18rem;
  padding: 20px;
  border: 1px solid #888;
  width: 70%;
  height: 500px;
}
img {
  margin-right: 3rem;
  margin-left: 3rem;
  margin-bottom: 2rem;
  width: 400px;
  height: 300px;
}
p {
  color: #242424;
}
#botones {
  margin-top: 2rem;
}
</style>