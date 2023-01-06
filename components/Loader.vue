<template>
    <div class="loading">
        <span class="object"></span>
        <span class="object"></span>
        <span class="object"></span>
        <span class="object"></span>
        <span class="object"></span>
    </div>
</template>

<style lang="scss" scoped>
/* Loader */
.object {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: auto;
  border: 2px solid transparent;
  border-top-color: #000;
  border-radius: 64px;
  animation: spin 1s ease infinite;
}

.object:nth-child(1) {
  opacity: 0.2;
  animation-delay: 0.4s;
}

.object:nth-child(2) {
  opacity: 0.4;
  animation-delay: 0.3s;
}

.object:nth-child(3) {
  opacity: 0.6;
  animation-delay: 0.2s;
}

.object:nth-child(4) {
  opacity: 0.8;
  animation-delay: 0.1s;
}

.object:nth-child(5) {
  opacity: 1;
  animation-delay: 0s;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>