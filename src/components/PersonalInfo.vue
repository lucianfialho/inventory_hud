<template>
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                
                </div>
                <div class="media-content">
                    <p class="title is-4">{{user.firstName}} {{user.lastName}}</p>
                    <p class="subtitle is-6">
                        <b-icon
                            icon="briefcase"
                            size="is-small">
                        </b-icon>
                        <span> {{user.job.label}} - <small>{{user.job.grade_label}}</small></span>
                    </p>
                    <p class="bank-info">
                        <b-icon
                            icon="piggy-bank"
                            size="is-small">
                        </b-icon>
                        <span> {{user.bank}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'personal-info',
  props: {
    user: {
        type: Object,
        required: true,
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        job: {
            type: Object,
            required: false,
            grade_label: {
                type: String,
                required: false
            }
        },
        bank: {
            type: Number,
            required: true,
        }
    }
    
  },
};
</script>

<style>
    .card{
        width: 100%;
        max-height: 17%;
        margin: 2%;
        z-index: 2;
        min-height: 17%;
    }
</style>
