const CreateSnippet: React.FC = () => {
  return (
    <div>
      <h1>Create Snippet</h1>
      <form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <br />
        <label>
          Code:
          <textarea name="code" />
        </label>
        <br />
        <button type="submit">Create Snippet</button>
      </form>
    </div>
  )
}

export default CreateSnippet
