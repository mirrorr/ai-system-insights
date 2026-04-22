function FileUpload() {
  return (
    <section>
      <h3>Upload System Data</h3>
      <input type="file" accept=".log,.txt,.json,.yaml,.yml" />
      <p>Upload logs, configs, or documents for analysis.</p>
    </section>
  );
}

export default FileUpload;
