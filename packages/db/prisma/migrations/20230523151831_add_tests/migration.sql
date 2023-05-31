-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "input" TEXT,
    "output" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_id_key" ON "Test"("id");

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
