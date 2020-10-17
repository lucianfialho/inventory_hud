<template>
    <div class="identityInfo">
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

<style lang="scss">
    .identityInfo{
        width: 100%;
        z-index: 2;
        
        background: rgba($color: #000000, $alpha: 0.1);
        display: flex;
        flex-direction: column;

        align-content: center;
        padding: 1rem;
        
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid white ;
        border-top: 1px solid white ;
    }
</style>
