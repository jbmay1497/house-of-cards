<script>
    import Comment from "./Comment.svelte";
</script>

<style>
      #comments {
      list-style-type: none;
      margin: 0;
      padding: 0;
      }
      #comments li {
      padding: 5px 10px;
      }
      #comments li:nth-child(odd) {
      background: #eee;
      }
</style>
<ul id = "comments">
    <Comment message="This is the chatbox!"/>
    <Comment message="Messages will appear here pls"/>
</ul>