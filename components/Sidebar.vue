<template>
  <view :class="['sidebar', isOpen ? 'active' : '']">
    <view class="sidebar-content">
      <!-- 内容区域 -->
      <slot>45654656</slot>
    </view>
    <view class="sidebar-toggle" @click="toggleSidebar">
      <!-- 切换按钮 -->
      <text>{{ isOpen ? '关闭' : '打开' }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true, // 侧边栏是否打开的状态
    };
  },
  methods: {
    toggleSidebar() {
      // 切换侧边栏的打开/关闭状态
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 0;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow-x: hidden;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.sidebar.active {
  width: 250px; /* 侧边栏打开时的宽度 */
}

.sidebar-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.sidebar-toggle {
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: #333;
  color: #fff;
}
</style>
