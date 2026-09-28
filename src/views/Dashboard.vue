<template>
  <div class="min-h-screen overflow-x-scroll bg-blue-100 pt-20">

    <TheHeader />

    <ErrorMessage v-if="errorMessage" :message="errorMessage" :showRetry="true" @retry="loadTasks" />

    <Transition name="slide-fade" appear>
      <FilterTask @add-modal="showModal = true" @filter-change="filter = $event"
        @search-change="searchQuery = $event" />
    </Transition>

    <Transition name="modal">
      <AddTask v-if="showModal" @close="showModal = false" @task-added="tasks.unshift($event)" />
    </Transition>

    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 mt-8">
      <TaskSkeleton :count="6" />
    </div>

    <TaskList v-else-if="filteredTasks.length" :tasks="filteredTasks" @edit="editingTask = $event"
      @delete="deleteTaskFromList($event)" />

    <div v-else-if="searchQuery.trim() && tasks.length > 0 && !showModal" class="text-center text-gray-500 mt-12">
      No tasks found matching your search.
    </div>

    <Transition name="empty" appear>
      <EmptyState v-if="isEmpty && !showModal" />
    </Transition>

    <Transition name="modal">
      <EditTask v-if="editingTask" :task="editingTask" @close="editingTask = null"
        @edit="task => { editTaskInList(task); editingTask = null; }" />
    </Transition>

  </div>
</template>

<script setup>
import { supabase } from "@/supabase";
import { ref, watch, computed, onMounted } from 'vue';
import TheHeader from "@/components/dashboard/layout/TheHeader.vue";
import FilterTask from "@/components/dashboard/tasks/FilterTask.vue";
import AddTask from "@/components/dashboard/tasks/AddTask.vue";
import TaskList from "@/components/dashboard/tasks/TaskList.vue";
import EditTask from "@/components/dashboard/tasks/EditTask.vue";
import EmptyState from "@/components/dashboard/tasks/EmptyState.vue";
import TaskSkeleton from "@/components/dashboard/tasks/TaskSkeleton.vue";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import { useErrorHandler } from '@/composables/useErrorHandler';

const tasks = ref([]);
const showModal = ref(false);
const filter = ref('all');
const editingTask = ref(null);
const isLoading = ref(false);
const hasLoaded = ref(false);
const searchQuery = ref('');
const { errorMessage, handleError, clearError } = useErrorHandler();

const isEmpty = computed(() =>
  hasLoaded.value && !isLoading.value && tasks.value.length === 0
);

const filteredTasks = computed(() => {
  let result = tasks.value;

  if (filter.value === 'pending') {
    result = result.filter(task => !task.completed);
  }

  if (filter.value === 'completed') {
    result = result.filter(task => task.completed);
  }

  const query = searchQuery.value.trim().toLowerCase();

  if (query) {
    result = result.filter(task =>
      task.title.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query)
    );
  }

  return result;
});

async function loadTasks() {
  isLoading.value = true;
  clearError();

  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('scheduled_date', { ascending: false });

    if (error) throw error;

    tasks.value = data;
    hasLoaded.value = true;

  } catch (error) {
    handleError(error, 'Failed to load tasks.', false);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadTasks();
});


watch(showModal, (val) => {
  if (val) editingTask.value = null;
});

watch(editingTask, (val) => {
  if (val) showModal.value = false;
})


function editTaskInList(editedTask) {
  const index = tasks.value.findIndex(task => task.id === editedTask.id);
  if (index !== -1) {
    tasks.value[index] = editedTask;
  }
}

function deleteTaskFromList(id) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-appear-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from,
.slide-fade-appear-from {
  opacity: 0;
  transform: translateY(-10px);
}


.empty-enter-active,
.empty.appear-active {
  transition: all 0.4s ease;
}

.empty-enter-from,
.empty-appear-from {
  opacity: 0;
  transform: translateY(10px);
}


.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>